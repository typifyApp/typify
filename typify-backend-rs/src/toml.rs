use {
    url::Url,
    serde::{Serialize, Deserialize},
};

#[derive(Serialize, Deserialize)]
pub struct ServerConfig {
    server_root : Url
}

impl Default for ServerConfig{
    fn default() -> Self {
        Self {
            server_root : Url::from_file_path({
                let mut x = std::env::current_dir().unwrap();
                x.pop();
                x
            }).unwrap(),
        }
    }
}