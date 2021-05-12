#![allow(unused_imports)]
#![allow(dead_code)]
#![feature(proc_macro_hygiene, decl_macro)]

extern crate chrono;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use {
    log::*,
    handlers::*,
};

mod handlers;
mod logs;
mod json;
mod config;
mod toml;
mod constants;

fn main() {
    let config = config::load_struct_toml::<toml::ServerConfig>(std::path::Path::new("config.toml"));
    if cfg!(debug_assertions) {
        logs::start_logger();
        info!("Running in debug mode.");
    } else {
        simple_logging::log_to_stderr(LevelFilter::Warn);
    }
    rocket::ignite().mount("/", routes![login::login]).launch();
}