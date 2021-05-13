# Instructions

To compile the backend you need rust / cargo nightly.
```
rustup toolchain install nightly
rustup default nightly
```

Create postgresql database. You will need to install postgresql from your package manager.
```
mkdir database
initdb -D database
pg_ctl -D database start
createdb typify
```