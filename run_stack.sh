#!/bin/sh
(cd rust-backend; cargo run) & (cd frontend; npm run start);