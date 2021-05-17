
use {
    std::sync::atomic::{AtomicU64,Ordering},
    super::models,
    super::SQLiteConnection,
    super::util::*,
    super::models::*,
    log::*,
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
pub fn register_post<'a>(register_form : Json<models::register::RegistrationForm>, conn : SQLiteConnection, cors : rocket_cors::Guard<'a>, key : State<state::SecretKey>) ->  Responder<'a, Json<models::register::RegistrationResponse>> {

    let mut search = conn.prepare(
        r#"
        SELECT username
        FROM accounts
        WHERE username=?1
        "#
    ).unwrap();
    let result = search.query_row(&[&register_form.username], |_row| {});
    if result.is_ok() {
        let response = models::register::RegistrationResponse {
            accepted : false,
            response : String::from(format!("Username {} already exists.", register_form.username)),
            account_restoration_key : String::new(),
        };
        return cors.responder(Json(response)) 
    }

    //Create the 64 byte restoration key from random nums.
    let restoration_key = "test";
    let key_salt = encryption::gen_random_salt();
    let key_hash = encryption::gen_hash(restoration_key.as_bytes(),&key_salt);
    let salt = encryption::gen_random_salt();
    let hash = encryption::gen_hash(register_form.password.as_bytes(),&salt);
    let encoded_salt = HEXUPPER.encode(&salt);
    let encoded_hash = HEXUPPER.encode(&hash);
    let encoded_key_salt = HEXUPPER.encode(&key_salt);
    let encoded_key_hash = HEXUPPER.encode(&key_hash);
    
    let mut insert = conn.prepare(
        r#"
        INSERT INTO accounts (username, password, salt, restoration_key, restoration_key_salt)
        VALUES (?1,?2,?3,?4,?5);
        "#
    ).unwrap();
    let result = insert.execute(&[&register_form.username,&encoded_hash,&encoded_salt,&encoded_key_hash,&encoded_key_salt]);
    if result.is_err() {
        info!("{}", result.err().unwrap());
    }

    let response = models::register::RegistrationResponse{
        accepted : true,
        response : String::from("Successfully registered!"),
        account_restoration_key : String::from(restoration_key),
    };
    cors.responder(Json(response)) 
}
