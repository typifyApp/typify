FROM ubuntu

RUN apt-get update && apt-get upgrade -y

# Install Node.js
RUN apt-get install --yes curl
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

# install npm and yarn
RUN apt-get -y install npm
RUN npm install --global yarn

COPY ./frontend .
# change directory to frontend
WORKDIR /frontend

RUN yarn install

RUN yarn build