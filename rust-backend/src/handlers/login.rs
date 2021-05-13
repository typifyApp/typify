use {
    log::*,
    std::sync::atomic::{AtomicU64,Ordering},
    super::api_structs::*,
    super::serde_structs::*,
    super::SQLiteConnection,
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
pub fn login(login_form : Json<LoginForm>, conn : SQLiteConnection) -> Json<LoginResponse> {
    let mut stmt = conn.prepare(
        r#"
        SELECT DISTINCT username, password 
        FROM accounts
        WHERE username=?1
        "#
    ).unwrap();

    let result = stmt.query_row(&[&login_form.username], |row| {
        let queried_password : String = row.get(1);
        if  queried_password.eq(&login_form.password) {
            info!("PASSWORD {} == {}",queried_password, login_form.password);
        }
        if queried_password.eq(&login_form.password) {
            Ok(LoginForm {
                username : row.get(0),
                password : queried_password,
            })
        } else {
            Err(String::from("Incorrect password."))
        }
    });
    let result = match result {
        Ok(found_table_entry) => {
            found_table_entry
        },
        Err(e) => {
            Err(format!("Database error: {}", e))
        }
    };

    match result {
        Ok(_accepted_login) => {
            let response = LoginResponse{
                response : String::from("Login accepted"),
                cookie : String::from(""),
                accepted : true,
            };
            Json(response)
        },
        Err(e) => {
            info!("REJECT");
            let response = LoginResponse{
                response : String::from(format!("Login rejected for reason : {}", e)),
                cookie : String::from(""),
                accepted : false,
            };
            Json(response)
        }
    }
}