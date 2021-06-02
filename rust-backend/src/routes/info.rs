use rocket::http::{RawStr, uri::Query};
use rocket_contrib::json::Json;
use super::models::info::QueryResponse;

#[get("/api/info?<token>")]
pub fn info(token : &RawStr) -> Json<QueryResponse> {
    let token = token.url_decode().unwrap();
    println!("{}", token);
    let result = QueryResponse {
        name : String::from("Hello"),
    };
    Json(result)
}