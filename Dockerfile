# Build the static files and executable backend
FROM ubuntu AS builder

# Update ubunut
RUN apt-get update && apt-get upgrade -y

WORKDIR /
RUN mkdir /typify
RUN mkdir /typify/frontend
RUN mkdir /typify/rust-backend

# ====== PREPARE TO BUILD FRONTEND ====== 
# Ensure we are in the root dir
# Install frontend dependencies
RUN apt-get install --yes curl
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential
# Install npm and yarn
RUN apt-get -y install npm
RUN npm install --global yarn

# ====== PREPARE TO BUILD BACKEND ======
# Install backend dependencies
RUN apt-get install --yes build-essential
RUN apt-get install --yes libsqlite3-dev
RUN apt-get install --yes libssl-dev 
RUN apt-get install --yes pkg-config 

# Install rust nightly
ENV RUSTUP_HOME=/rust
ENV CARGO_HOME=/cargo
ENV PATH=/cargo/bin:/rust/bin:$PATH
RUN echo "(curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain nightly --no-modify-path) && rustup default nightly" > /install-rust.sh && chmod 755 /install-rust.sh
RUN /install-rust.sh

# ====== BUILD FRONTEND ====== 
COPY ./frontend /typify/frontend
# Change directory to frontend
WORKDIR /typify/frontend
RUN yarn install
RUN yarn build

# ====== BUILD BACKEND ======
COPY ./rust-backend /typify/rust-backend
# cd into rust-backend folder
WORKDIR /typify/rust-backend
RUN cargo +nightly build --release
RUN (cd openssl; ./gen_cert.sh)

# ====== PUT BUILT FILES IN NEW IMAGE ======
FROM ubuntu
RUN apt-get update
RUN apt-get install --yes sqlite3
RUN apt-get install --yes libssl-dev
# Tell the docker user that this port is gonna be used.
# Check out docker run -P
EXPOSE 443/tcp
RUN ["mkdir", "/typify"]
WORKDIR /typify
COPY --from=builder /typify/rust-backend/target/release/rust-backend .
COPY --from=builder /typify/rust-backend/typify.sqlite .
COPY --from=builder /typify/rust-backend/Rocket.toml .
COPY --from=builder /typify/rust-backend/openssl/server.* ./
COPY --from=builder /typify/frontend/build ./public/
RUN chmod +x rust-backend
# run backend
#CMD /bin/bash
CMD ROCKET_ADDRESS=$(hostname -i) /typify/rust-backend