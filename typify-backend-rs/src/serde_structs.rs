use {
    url::Url,
    serde::{Serialize, Deserialize},
    std::sync::atomic::AtomicU64,
};

#[derive(Serialize, Deserialize)]
pub struct ServerStats {
    pub total_visitor_count : AtomicU64,
    pub unique_visitor_count : AtomicU64,
}

impl Default for ServerStats{
    fn default() -> Self {
        Self {
            total_visitor_count : AtomicU64::from(0),
            unique_visitor_count : AtomicU64::from(0),
        }
    }
}