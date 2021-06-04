#!/bin/bash
sudo docker build -t typify .
sudo docker run -it -p 8000:8000 typify