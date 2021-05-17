use {
    log::*,
    super::models::*,
    super::SQLiteConnection,
    super::util::*,
    rocket_contrib::json::Json,
    rocket_cors::Responder,
    rocket_contrib::json::JsonValue,
    rocket::response::{Response},
    rocket::response::status,
    rocket::State,
    jsonwebtoken::{encode, decode, Header, Algorithm, Validation},
};

use data_encoding::HEXUPPER;

#[options("/api/login")]
pub fn login_option(cors : rocket_cors::Guard<'_>) -> Responder<'_,status::Accepted<()>> {
    cors.responder(status::Accepted(Some(())))
}

#[post("/api/login", data = "<login_form>")]
pub fn login_post<'a>(login_form : Json<login::LoginForm>, conn : SQLiteConnection, cors : rocket_cors::Guard<'a>, key : State<state::SecretKey>) -> Responder<'a, Json<login::LoginResponse>> {
    let mut stmt = conn.prepare(
        r#"
        SELECT DISTINCT username, password, salt
        FROM accounts
        WHERE username=?1
        "#
    ).unwrap();
    //test
    let result = stmt.query_row(&[&login_form.username], |row| {
        let queried_password : String = row.get(1);
        let salt_string : String = row.get(2);
        let hash = HEXUPPER.decode(queried_password.as_bytes()).unwrap();
        let salt = HEXUPPER.decode(salt_string.as_bytes()).unwrap();

        if encryption::check_hash(&hash, &salt, login_form.password.as_bytes()) {
            Ok(login::LoginForm {
                username : row.get(0),
                password : queried_password,
            })
        } else {
            Err(String::from("Incorrect username or password."))
        }
    });
    let result = match result {
        Ok(found_table_entry) => found_table_entry,
        Err(_e) => Err(format!("Incorrect username or password.")),
    };

    let response = match result {
        Ok(_accepted_login) => {
            let claims = super::models::Claims {
                sub : String::from(login_form.username.clone()),
                company : String::from("typify"),
                exp : 3000,
            };
            let token = encode(&Header::default(), &claims, key.inner().0.as_bytes()).unwrap();

            let response = login::LoginResponse{
                response : String::from("Login accepted"),
                token : token,
                accepted : true,
            };
            Json(response)
        },
        Err(e) => {
            let response = login::LoginResponse{
                response : String::from(format!("{}", e)),
                token : String::from(""),
                accepted : false,
            };
            Json(response)
        }
    };
    cors.responder(response)
}
    