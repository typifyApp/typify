use {
    serde::{Serialize, Deserialize},
};

#[derive(Serialize, Deserialize)]
pub struct RegistrationForm {
    pub username : String,
    pub password : String,
}

#[derive(Serialize, Deserialize)]
pub struct RegistrationResponse {
    pub accepted : bool,
    pub response : String,
    pub account_restoration_key : String,
    pub cookie : String,
}