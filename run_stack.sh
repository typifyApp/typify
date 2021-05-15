#!/bin/sh
(cd frontend; yarn install; yarn build)
(cd rust-backend; cargo run)