use {
    serde::{Serialize, Deserialize},
};

#[derive(Serialize,Deserialize,FromForm)]
pub struct LoginForm {
    pub username : String,
    pub password : String,
}