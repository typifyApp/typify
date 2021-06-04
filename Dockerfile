FROM ubuntu

# Update ubunut
RUN apt-get update && apt-get upgrade -y

# ====== PREPARE TO BUILD FRONTEND ====== 
# Ensure we are in the root dir
WORKDIR /
# Install frontend dependencies
RUN apt-get install --yes curl
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential
# Install npm and yarn
RUN apt-get -y install npm
RUN npm install --global yarn

# ====== BUILD FRONTEND ====== 
COPY ./frontend .
# Change directory to frontend
WORKDIR /frontend
RUN yarn install
RUN yarn build

# ====== PREPARE TO BUILD BACKEND ======
# Ensure we are in the root dir
WORKDIR /
# Install backend dependencies
RUN apt-get install --yes libsqlite3-dev
RUN apt-get install --yes libssl-dev 
RUN apt-get install --yes pkg-config 

# Install rust nightly
ENV RUSTUP_HOME=/rust
ENV CARGO_HOME=/cargo 
ENV PATH=/cargo/bin:/rust/bin:$PATH
RUN echo "(curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain nightly --no-modify-path) && rustup default nightly" > /install-rust.sh && chmod 755 /install-rust.sh
RUN ./install-rust.sh

# ====== BUILD BACKEND ======
COPY ./rust-backend .
# cd into rust-backend folder
WORKDIR /rust-backend
RUN cargo build --release

# run backend
RUN cargo run --release 
