#!/bin/sh
# Instantly log in
#export REACT_APP_ENV=development
trap "kill 0" EXIT
(cd rust-backend; cargo run) & (cd frontend; npm run start);