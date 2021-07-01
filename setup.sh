#!/bin/sh
# ============ Install required packages ============

# Distro specific stuff
if command -v pacman &> /dev/null; then
    sudo pacman -S openssl sqlite3 --noconfirm
elif command -v dnf &> /dev/null; then
    sudo dnf install openssl openssl-devel sqlite-devel --assumeyes
else
    echo "Your pacackge manager is not supported yet";
    exit 1;
fi
# ============ Frontend ============

# ============ Backend ============

# Install rustup
if ! command -v rustup &> /dev/null; then
    echo "Installing rustup..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
    rustup toolchain install nightly
fi

echo "============Setting up frontend...============"
(
    cd frontend;
    echo "..."
)
echo "============Setting up backend...============="
# Distro with the pacman package manager
(
    cd rust-backend;
    rustup override set nightly;
    ./setup.sh;
)

echo "Finished setup.";
echo "RESTART YOUR SHELL PLEASE ( rust adds things to your path that you need )"
exit 0;
