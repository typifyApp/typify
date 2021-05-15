use {
    log::*,
    std::sync::atomic::{AtomicU64,Ordering},
    rocket_contrib::json::Json,
    rocket::request::Form,
    rocket_contrib::json::JsonValue,
    rocket::State,
    rocket::http::hyper::Method,
    rocket::http::hyper::{
        header::Headers,
        header::Allow,
    },
    rocket::response::{Response, Redirect, Flash},
    rocket::http::{
        Header,
        Status,
        Cookie,
        ContentType
    },
};

pub mod login;
pub mod register;
use super::*;