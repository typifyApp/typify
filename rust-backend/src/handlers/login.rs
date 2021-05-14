use {
    log::*,
    super::api_structs::*,
    super::SQLiteConnection,
    super::encryption::*,
    rocket_contrib::json::Json,
    rocket_cors::Responder,
    rocket_contrib::json::JsonValue,
    rocket::response::{Response},
    rocket::http::{Header,Status},
    rocket::response::status,
};

use data_encoding::HEXUPPER;

#[derive(Responder)]
pub struct MyJson {
    inner : JsonValue,
    pub cors : Header<'static>
}

#[options("/login")]
pub fn login_option(cors : rocket_cors::Guard<'_>) -> Responder<'_,status::Accepted<()>> {
    cors.responder(status::Accepted(Some(())))
}

#[post("/login", data = "<login_form>")]
pub fn login_post<'a>(login_form : Json<LoginForm>, conn : SQLiteConnection) -> MyJson {
    let mut stmt = conn.prepare(
        r#"
        SELECT DISTINCT username, password, salt
        FROM accounts
        WHERE username=?1
        "#
    ).unwrap();

    let result = stmt.query_row(&[&login_form.username], |row| {
        
        let queried_password : String = row.get(1);
        let salt_string : String = row.get(2);
        let hash = HEXUPPER.decode(queried_password.as_bytes()).unwrap();
        let salt = HEXUPPER.decode(salt_string.as_bytes()).unwrap();

        if check_hash(&hash, &salt, login_form.password.as_bytes()) {
            Ok(LoginForm {
                username : row.get(0),
                password : queried_password,
            })
        } else {
            Err(String::from("Incorrect password."))
        }
    });
    let result = match result {
        Ok(found_table_entry) => found_table_entry,
        Err(e) => Err(format!("Database error: {}", e)),
    };

    let response = match result {
        Ok(_accepted_login) => {
            let response = LoginResponse{
                response : String::from("Login accepted"),
                cookie : String::from(""),
                accepted : true,
            };
            json!(response)
        },
        Err(e) => {
            let response = LoginResponse{
                response : String::from(format!("Login rejected for reason : {}", e)),
                cookie : String::from(""),
                accepted : false,
            };
            json!(response)
        }
    };

    let header = Header::new("Access-Control-Allow-Origin", "*");
    MyJson{
        inner : response,
        cors : header,
    }
}