#!/bin/sh
# let the executable
if [[ $# != 1 ]]; then
    echo "Incorrect amount of arguments, please specify the unprivledged user that will run the backend."
else 
    setcap cap_net_bind_service=ep $(pwd)/rust-backend
    sudo -u $1 ./rust-backend
fi