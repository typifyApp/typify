use {
    super::json,
    rocket_contrib::json::Json,
    rocket::request::Form,
    rocket_contrib::json::JsonValue,
    rocket::response::{Redirect, Flash},
    rocket::http::{
        Status,
        Cookie,
        ContentType
    },
};

#[post("/login", data = "<login_form>")]
pub fn login(login_form : Json<json::LoginForm>) ->  String {
    String::from("hello")
}