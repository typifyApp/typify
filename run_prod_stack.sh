#!/bin/bash
sudo docker build -t typifyapp/typify:latest .
sudo docker run -it -p 127.0.0.1:443:443 typifyapp/typify