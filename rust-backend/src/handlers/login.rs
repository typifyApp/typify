use {
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
pub fn login(login_form : Json<LoginForm>, stats : State<ServerStats>, conn : SQLiteConnection) ->  String {
    let mut default_login = LoginForm{
        username : String::from(""),
        password : String::from(""),
    };
    let mut stmt = conn.prepare(
        r#"SELECT DISTINCT username, password 
        FROM accounts
        WHERE username=?1"#
    ).unwrap();

    let result = stmt.query_row(&[&login_form.username], |row| {
        let password : String = row.get(1);
        if  password == login_form.password {
            Some(LoginForm{
                username : row.get(0),
                password : row.get(1),
            })
        } else {
            None
        }
    }).unwrap();

    if let Some(login_data) = result {
        format!("username : {}, password : {}", login_data.username,login_data.password)
    } else {
        format!("Cannot find user {}", login_form.username)
    }
}