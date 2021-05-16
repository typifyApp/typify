use data_encoding::HEXUPPER;
use ring::error::Unspecified;
use ring::rand::SecureRandom;
use ring::{digest, pbkdf2, rand};
use std::num::NonZeroU32;

// Do not change unless you know what you ard doing.
// Ideally dont ever change this.
pub const ITER_COUNT : u32 = 5000;
pub const CREDENTIAL_LEN: usize = digest::SHA512_OUTPUT_LEN;
static DIGEST_ALG: &'static digest::Algorithm = &digest::SHA256;

pub fn gen_random_salt() -> [u8; CREDENTIAL_LEN] {
    let rng = rand::SystemRandom::new();
    let mut salt = [0u8; CREDENTIAL_LEN];
    rng.fill(&mut salt).unwrap();
    salt
}

pub fn gen_hash<'a>(input : &[u8],salt : &[u8]) -> [u8;CREDENTIAL_LEN] {
    let mut hash = [0u8; CREDENTIAL_LEN];
    pbkdf2::derive(
        DIGEST_ALG,
        ITER_COUNT,
        &salt,
        input,
        &mut hash,
    );
    hash
}

pub fn check_hash(hash : &[u8],salt : &[u8], input : &[u8]) -> bool {
    let should_succeed = pbkdf2::verify(
        DIGEST_ALG,
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

#[cfg(test)]
mod test {
    #[test]
    fn check_hash() {
        let encoded_hash = b"4F59ED30FCA8881985F81AB3D5D721CDBE9596925118E6AB1F343D1A2CD15D724D095083A09FF629F142DE6BF23AD17E2412241B44E93E8F572EFD6777810E45";
        let encoded_salt = b"5CD404BE2C6A83C469F05965939F0D982EF4DBFD4AEBCA09E47B71443D3CBD9C65066386848285A429C12D0803110910A1A940F1655E883D92E841CA391C894D";
        let hash = data_encoding::HEXUPPER.decode(encoded_hash).unwrap();
        let salt = data_encoding::HEXUPPER.decode(encoded_salt).unwrap();
        let input = b"test";
        assert_eq!(super::check_hash(&hash, &salt, input), true);
    }
    #[test]
    fn gen_hash() {
        let encoded_resulting_hash : &[u8] = b"4F59ED30FCA8881985F81AB3D5D721CDBE9596925118E6AB1F343D1A2CD15D724D095083A09FF629F142DE6BF23AD17E2412241B44E93E8F572EFD6777810E45";
        let encoded_salt = b"5CD404BE2C6A83C469F05965939F0D982EF4DBFD4AEBCA09E47B71443D3CBD9C65066386848285A429C12D0803110910A1A940F1655E883D92E841CA391C894D";
        let input = b"test";
        let salt = data_encoding::HEXUPPER.decode(encoded_salt).unwrap();
        let resulting_hash = data_encoding::HEXUPPER.decode(encoded_resulting_hash).unwrap();
        assert_eq!(super::gen_hash(input, &salt), &resulting_hash[..]);
    }
}