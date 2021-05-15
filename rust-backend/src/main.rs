#![allow(unused_imports)]
#![allow(dead_code)]
#![feature(const_option)]
#![feature(proc_macro_hygiene, decl_macro)]

extern crate chrono;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
use {
    log::*,
    handlers::*,
    rocket::config::{Config, Environment},
    rocket_contrib::databases::rusqlite,
    rocket::http::Header,
    rocket::http::Method,
    rocket_cors::AllowedHeaders,
    rocket_cors::AllowedOrigins,
    rocket_contrib::serve::StaticFiles,
};

#[database("typify")]
pub struct SQLiteConnection(rusqlite::Connection);

mod handlers;
mod logs;
mod api_structs;
mod load;
mod serde_structs;
mod constants;
mod encryption;

fn main() -> Result<(), Box<dyn std::error::Error>>{
    if cfg!(debug_assertions) {
        //logs::log_to_file(1, false, constants::LOGS_DIR)
        simple_logging::log_to_stderr(LevelFilter::Info);
        info!("Logger running in debug mode.");
    } else {
        simple_logging::log_to_stderr(LevelFilter::Warn);
    }

    let static_file_dir = if cfg!(debug_assertions) {
        StaticFiles::from("../frontend/build")
    } else {
        StaticFiles::from("public")
    };
    
    let cors = rocket_cors::CorsOptions::default()
        .send_wildcard(true).to_cors().unwrap();

    rocket::ignite() 
    .manage(cors)
    .mount("/", routes![login::login_post,login::login_option,register::register_post,register::register_option])
    .mount("/", static_file_dir)
    .attach(SQLiteConnection::fairing())
    .launch();
    Ok(())
}