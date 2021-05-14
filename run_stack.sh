#!/bin/sh
# Instantly log in
#export REACT_APP_ENV=development
trap "kill 0" EXIT
(cd frontend; npm run build);
(cd rust-backend; cargo run);