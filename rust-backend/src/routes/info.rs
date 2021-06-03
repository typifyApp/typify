use rocket::http::{RawStr, uri::Query};
use rocket_contrib::json::Json;
use super::models::info::QueryResponse;
use rocket_cors::Responder;
use super::SQLiteConnection;

#[options("/api/info?")]
pub fn register_option(cors : rocket_cors::Guard<'_>) -> Responder<'_,rocket::response::status::Accepted<()>> {
    cors.responder(rocket::response::status::Accepted(Some(())))
}

#[get("/api/info?<token>")]
pub fn info(token : &RawStr, conn : SQLiteConnection) -> Json<QueryResponse> {
    let token = token.url_decode().unwrap();
    let mut stmt = conn.prepare(
        r#"
        SELECT DISTINCT username, password, salt
        FROM accounts
        WHERE username=?1
        "#
    ).unwrap();
    let result = QueryResponse {
        name : String::from("Hello"),
    };
    Json(result)
}