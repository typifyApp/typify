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
    rocket_contrib::databases::postgres,
};

#[database("typify")]
struct PostgresDbConnection(postgres::Connection);

mod handlers;
mod logs;
mod api_structs;
mod load;
mod serde_structs;
mod constants;

fn main() -> Result<(), Box<dyn std::error::Error>>{
    if cfg!(debug_assertions) {
        //logs::start_logger();
        simple_logging::log_to_stderr(LevelFilter::Info);
        info!("Logger running in debug mode.");
    } else {
        simple_logging::log_to_stderr(LevelFilter::Warn);
    }
    let stats = load::load_struct_toml::<serde_structs::ServerStats>(std::path::Path::new("Stats.toml"));
    rocket::ignite()
        .manage(stats)
        .mount("/", routes![login::login])
        .attach(PostgresDbConnection::fairing())
        .launch();
    Ok(())
}