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
    rocket::http::hyper::Method,
    rocket::http::hyper::{
        header::Headers,
        header::Allow,
    },
    rocket::response::{Response, Redirect, Flash},
    rocket::http::{
        Header,
        Status,
        Cookie,
        ContentType
    },
};

#[derive(Responder)]
pub struct MyJson {
    inner : JsonValue,
    pub cors : Header<'static>
}

#[options("/login")]
pub fn login_option<'a>() -> Response<'a> {
    let mut res = Response::new();
    res.set_status(Status::new(200, "No Content"));
    res.adjoin_header(ContentType::Plain);
    res.adjoin_raw_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.adjoin_raw_header("Access-Control-Allow-Origin", "*");
    res.adjoin_raw_header("Access-Control-Allow-Credentials", "true");
    res.adjoin_raw_header("Access-Control-Allow-Headers", "Content-Type");
    res
}

#[post("/login", data = "<login_form>")]
pub fn login_post<'a>(login_form : Json<LoginForm>, conn : SQLiteConnection) -> MyJson {
    let mut stmt = conn.prepare(
        r#"
        SELECT DISTINCT username, password 
        FROM accounts
        WHERE username=?1
        "#
    ).unwrap();

    let result = stmt.query_row(&[&login_form.username], |row| {
        let queried_password : String = row.get(1);
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

    let mut response = match result {
        Ok(_accepted_login) => {
            let response = LoginResponse{
                response : String::from("Login accepted"),
                cookie : String::from(""),
                accepted : true,
            };
            json!(response)
        },
        Err(e) => {
            info!("REJECT");
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