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

    rocket::ignite()
        .manage(rocket_cors::CorsOptions::default().to_cors().unwrap())
        .mount("/", routes![login::login_post,login::login_option,register::register])
        .attach(SQLiteConnection::fairing())
        .launch();
    Ok(())
}

// Default cors options for OPTIONS requests to any
    // uri
    /*
    let allowed_origins = AllowedOrigins::All;
    let cors_options = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post, Method::Delete]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        expose_headers: ["Content-Type", "X-Custom"]
            .iter()
            .map(ToString::to_string)
            .collect(),
        max_age: Some(42),
        send_wildcard: false,
        fairing_route_base: "/mycors".to_string(),
        fairing_route_rank: 0,
    };
    */