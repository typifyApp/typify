use serde::{Serialize,Deserialize};

#[derive(Serialize,Deserialize)]
pub struct QueryResponse {
    pub name : String
}