use data_encoding::HEXUPPER;
use ring::error::Unspecified;
use ring::rand::SecureRandom;
use ring::{digest, pbkdf2, rand};
use std::num::NonZeroU32;

pub const ITER_COUNT : NonZeroU32 = NonZeroU32::new(5_000).unwrap();
pub const CREDENTIAL_LEN: usize = digest::SHA512_OUTPUT_LEN;

pub fn get_hash<'a>(input : &[u8]) -> ([u8; CREDENTIAL_LEN],[u8;CREDENTIAL_LEN]) {
    let rng = rand::SystemRandom::new();
    let mut salt = [0u8; CREDENTIAL_LEN];
    rng.fill(&mut salt).unwrap();
    let mut hash = [0u8; CREDENTIAL_LEN];

    pbkdf2::derive(
        pbkdf2::PBKDF2_HMAC_SHA512,
        ITER_COUNT,
        &salt,
        input,
        &mut hash,
    );
    (salt,hash)
}

pub fn check_hash(hash : &[u8],salt : &[u8], input : &[u8]) -> bool {
    let should_succeed = pbkdf2::verify(
        pbkdf2::PBKDF2_HMAC_SHA512,
        ITER_COUNT,
        &salt,
        input,
        hash,
    );
    if let Ok(()) = should_succeed {
        true
    } else {
        false
    }
}