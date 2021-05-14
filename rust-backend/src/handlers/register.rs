
use {
    std::sync::atomic::{AtomicU64,Ordering},
    super::api_structs::*,
    super::serde_structs::*,
    super::SQLiteConnection,
    super::encryption::*,
    data_encoding::*,
    rocket_contrib::json::Json,
    rocket::request::Form,
    rocket_contrib::json::JsonValue,
    rocket::State,
    rocket::response::{Response,Redirect, Flash},
    rocket_cors::Responder,
    rocket::response::status,
    rocket::http::{
        Status,
        Cookie,
        ContentType
    },
};

#[options("/register")]
pub fn login_option(cors : rocket_cors::Guard<'_>) -> Responder<'_,status::Accepted<()>> {
    cors.responder(status::Accepted(Some(())))
}

#[post("/register", data = "<register_form>")]
pub fn register(register_form : Json<RegistrationForm>, conn : SQLiteConnection) ->  Json<RegistrationResponse> {
    let (salt,hash) = get_hash(register_form.username.as_bytes());
    
    let mut stmt = conn.prepare(
        r#"
        INSERT INTO accounts (username, user_id, password, salt)
        VALUES (?1,?2,?3,?4); 
        "#
    ).unwrap();
    let encoded_salt = HEXUPPER.encode(&salt);
    let encoded_hash = HEXUPPER.encode(&hash);
    stmt.execute(&[&register_form.username,&0,&encoded_hash,&encoded_salt]).unwrap();
    let response = RegistrationResponse{
        accepted : true,
        account_restoration_key : String::from(""),
        cookie : String::from(""),
    };
    Json(response)
}
