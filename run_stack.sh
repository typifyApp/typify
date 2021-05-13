#!/bin/sh
trap "kill 0" EXIT
(cd rust-backend; cargo run) & (cd frontend; npm run start);