
use {
    std::sync::atomic::{AtomicU64,Ordering},
    super::models,
    super::SQLiteConnection,
    super::util::*,
    data_encoding::*,
    rocket_contrib::json::Json,
    rocket::request::Form,
    rocket_contrib::json::JsonValue,
    rocket::State,
    rocket::response::{Response,Redirect, Flash},
    rocket_cors::Responder,
    rocket::response::status,
    ring::rand::SecureRandom,
    ring::{digest, pbkdf2, rand},
    rocket::http::{
        Status,
        Cookie,
        ContentType
    },
};

#[options("/api/register")]
pub fn register_option(cors : rocket_cors::Guard<'_>) -> Responder<'_,status::Accepted<()>> {
    cors.responder(status::Accepted(Some(())))
}

#[post("/api/register", data = "<register_form>")]
pub fn register_post(register_form : Json<models::register::RegistrationForm>, conn : SQLiteConnection, cors : rocket_cors::Guard<'_>) ->  Responder<Json<models::register::RegistrationResponse>> {
    //Create the 64 byte restoration key from random nums.
    let restoration_key = "test";
    let (key_salt,key_hash) = encryption::get_hash(restoration_key.as_bytes());
    let (salt,hash) = encryption::get_hash(register_form.username.as_bytes());
    
    let mut stmt = conn.prepare(
        r#"
        INSERT INTO accounts (username, user_id, password, salt,restoration_key,restoration_key_salt)
        VALUES (?1,?2,?3,?4,?5,?6);
        "#
    ).unwrap();
    let encoded_salt = HEXUPPER.encode(&salt);
    let encoded_hash = HEXUPPER.encode(&hash);
    let encoded_key_salt = HEXUPPER.encode(&key_salt);
    let encoded_key_hash = HEXUPPER.encode(&key_hash);
    stmt.execute(&[&register_form.username,&0,&encoded_hash,&encoded_salt,&encoded_key_hash,&encoded_key_salt]).unwrap();
    let response = models::register::RegistrationResponse{
        accepted : true,
        account_restoration_key : String::from(restoration_key),
        cookie : String::from(""),
    };
    cors.responder(Json(response)) 
}
