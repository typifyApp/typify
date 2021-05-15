use {
    serde::{Serialize, Deserialize},
};

#[derive(Serialize,Deserialize)]
pub struct LoginForm {
    pub username : String,
    pub password : String,
}

#[derive(Serialize,Deserialize)]
pub struct LoginResponse {
    pub accepted : bool,
    pub response : String,
    pub cookie : String,
}