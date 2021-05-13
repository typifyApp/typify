use {
    std::sync::atomic::{AtomicU64,Ordering},
    super::api_structs::*,
    super::serde_structs::*,
    rocket_contrib::json::Json,
    rocket::request::Form,
    rocket_contrib::json::JsonValue,
    rocket::State,
    rocket::response::{Redirect, Flash},
    rocket::http::{
        Status,
        Cookie,
        ContentType
    },
};

#[post("/login", data = "<login_form>")]
pub fn login(login_form : Json<LoginForm>, stats : State<ServerStats>) ->  String {
    let mut current_count = stats.total_visitor_count.load(Ordering::Relaxed);
    current_count += 1;
    stats.total_visitor_count.store(current_count, Ordering::SeqCst);
    String::from("hello")
}