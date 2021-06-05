#!/bin/bash
sudo docker build -t typify .
sudo docker run -it -p 127.0.0.1:443:443 typify