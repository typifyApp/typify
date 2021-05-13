#![allow(unused_imports)]
#![allow(dead_code)]
#![feature(proc_macro_hygiene, decl_macro)]

extern crate chrono;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use {
    log::*,
    handlers::*,
    rocket::config::{Config, Environment}
};

mod handlers;
mod logs;
mod api_structs;
mod load;
mod serde_structs;
mod constants;

fn main() -> Result<(), Box<dyn std::error::Error>>{
    if cfg!(debug_assertions) {
        logs::start_logger();
        info!("Running in debug mode.");
    } else {
        simple_logging::log_to_stderr(LevelFilter::Warn);
    }
    let stats = config::load_struct_toml::<ServerStats>()
    rocket::ignite()
        .manage(serde_structs::ServerStats::default())
        .mount("/", routes![login::login]).launch();
    Ok(())
}