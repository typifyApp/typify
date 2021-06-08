#![allow(unused_imports)]
#![allow(dead_code)]
#![feature(const_option)]
#![feature(proc_macro_hygiene, decl_macro)]

extern crate chrono;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
use {
    log::*,
    routes::*,
    rocket::config::{Config, Environment},
    rocket_contrib::databases::rusqlite,
    rocket::http::Header,
    rocket::http::Method,
    rocket::fairing::AdHoc,
    rocket_cors::AllowedHeaders,
    rocket_cors::AllowedOrigins,
    rocket_contrib::serve::StaticFiles,
    native_tls::{Identity, TlsAcceptor, TlsStream},
    rocket_contrib::helmet::SpaceHelmet,
};

#[database("typify")]
pub struct SQLiteConnection(rusqlite::Connection);

pub const LOGS_DIR: &str = "logs";

mod routes;
mod models;
mod util;

fn main() -> Result<(), Box<dyn std::error::Error>>{
    
    let static_file_dir = if cfg!(debug_assertions) {
        simple_logging::log_to_stderr(LevelFilter::Info);
        StaticFiles::from("../frontend/build")
    } else {
        simple_logging::log_to_stderr(LevelFilter::Warn);
        StaticFiles::from("public")
    };
    
    let cors = rocket_cors::CorsOptions::default()
        .allowed_origins(AllowedOrigins::All)
        .send_wildcard(true).to_cors().unwrap();

    rocket::ignite() 
    .manage(cors)
    .mount("/", routes![
        login::login_post,
        login::login_option,
        register::register_post,
        register::register_option,
        info::info,
    ])
    .mount("/", static_file_dir)
    .attach(SQLiteConnection::fairing())
    .attach(security_policy)
    .attach(AdHoc::on_attach("Secret Key", |rocket| {
        let assets_dir = rocket.config()
            .get_str("key")
            .unwrap()
            .to_string();
        Ok(rocket.manage(models::state::SecretKey(String::from(assets_dir))))
    }))
    .launch();
    Ok(())
}

/*
pub fn log_to_file(amount_of_logs: u16, full_timestamp : bool , path : &std::path::Path) {
    // Create directory to store logs.
    let directory : std::fs::ReadDir = std::fs::read_dir(path).or_else::<std::fs::ReadDir,_>(|x| {
        std::fs::create_dir(path).expect(format!("Cannot create logs directory [{}] because {}", path.to_str().unwrap(), x).as_str());
        Ok(std::fs::read_dir(path).expect(format!("Cannot read logs directory [{}]", path.to_str().unwrap()).as_str()))
    }).expect("Cannot read logs directory. How can this program can create a dir and not be able to access it... weird");

    //If there are too many logfiles, delete the oldest ones.
    //This seems like a bad way of doing it, rewrite this at some point.
    let mut dir_entries: Vec<Result<std::fs::DirEntry, std::io::Error>> = directory.collect();
    if dir_entries.len() >= amount_of_logs.into() {
        &dir_entries.sort_by(|a, b| {
            a.as_ref()
                .unwrap()
                .metadata()
                .unwrap()
                .created()
                .unwrap()
                .partial_cmp(&b.as_ref().unwrap().metadata().unwrap().created().unwrap())
                .unwrap() // This is sooooooo nasty.
        });
        let mut old_len = dir_entries.len();
        while old_len >= amount_of_logs.into() {
            std::fs::remove_file(dir_entries.first().unwrap().as_ref().unwrap().path()).unwrap();
            dir_entries.remove(0).unwrap();
            old_len -= 1;
        }
    }
    // Create logging facility into stderr.
    let logfile_name = if full_timestamp {
        std::path::PathBuf::from(format!(
            "{}/debug {}.log",
            path.to_str().unwrap(),
            chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string()
        ))
    } else {
        std::path::PathBuf::from(format!("{}/debug.log", path.to_str().unwrap()))
    };
    simple_logging::log_to_file(logfile_name, LevelFilter::Info).unwrap();
}
*/