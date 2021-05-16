#!/bin/sh
(cd frontend; yarn install; yarn build)
(cd rust-backend/openssl; ./gen_cert.sh)
(cd rust-backend; cargo run)