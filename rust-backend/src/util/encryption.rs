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
        let encoded_hash = b"7119BCB1A96A39A847D3D32FFC3F4B65E8FA995D766B234C40B6B814FDCA03CC8CA8AEF3E7DD2FB673F831CD9A7A2B47133BFE01B333ABACD655695800DF5C59";
        let encoded_salt = b"A2884857533B5C1C98CF08C4B3056DA5E101F255D710EF80A3CBFBA5B1B46B5260361D0EED958A09E39B34CD17FE7D7719DCE4AF33AC1733FD0728D656174840";
        let hash = data_encoding::HEXUPPER.decode(encoded_hash).unwrap();
        let salt = data_encoding::HEXUPPER.decode(encoded_salt).unwrap();
        let input = b"test";
        assert_eq!(super::check_hash(&hash, &salt, input), true);
    }
    #[test]
    fn gen_hash() {
        let encoded_resulting_hash : &[u8] = b"7119BCB1A96A39A847D3D32FFC3F4B65E8FA995D766B234C40B6B814FDCA03CC8CA8AEF3E7DD2FB673F831CD9A7A2B47133BFE01B333ABACD655695800DF5C59";
        let encoded_salt = b"A2884857533B5C1C98CF08C4B3056DA5E101F255D710EF80A3CBFBA5B1B46B5260361D0EED958A09E39B34CD17FE7D7719DCE4AF33AC1733FD0728D656174840";
        let input = b"test";
        let salt = data_encoding::HEXUPPER.decode(encoded_salt).unwrap();
        let resulting_hash = data_encoding::HEXUPPER.decode(encoded_resulting_hash).unwrap();
        assert_eq!(super::gen_hash(input, &salt), &resulting_hash[..]);
    }
}