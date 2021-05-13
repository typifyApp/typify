#![allow(unused_imports)]
#![allow(dead_code)]
#![feature(proc_macro_hygiene, decl_macro)]

extern crate chrono;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
use {
    log::*,
    handlers::*,
    rocket::config::{Config, Environment},
    rocket_contrib::databases::rusqlite,
};

#[database("typify")]
pub struct SQLiteConnection(rusqlite::Connection);

mod handlers;
mod logs;
mod api_structs;
mod load;
mod serde_structs;
mod constants;

fn main() -> Result<(), Box<dyn std::error::Error>>{
    if cfg!(debug_assertions) {
        //logs::log_to_file(1, false, constants::LOGS_DIR)
        simple_logging::log_to_stderr(LevelFilter::Info);
        info!("Logger running in debug mode.");
    } else {
        simple_logging::log_to_stderr(LevelFilter::Warn);
    }

    rocket::ignite()
        .mount("/", routes![login::login_post,login::login_option])
        .attach(SQLiteConnection::fairing())
        .launch();
    Ok(())
}