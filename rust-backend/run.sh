#!/bin/sh
sudo setcap cap_net_bind_service=ep /home/dawids/Projects/rust/typify/rust-backend/target/release/rust-backend
./target/release/rust-backend