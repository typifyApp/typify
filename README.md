# :keyboard: typify
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 [![Backend Build Status](https://github.com/J1M-RYAN/typify/workflows/rust-backend/badge.svg)](https://github.com/J1M-RYAN/typify/actions?query=workflow%3Arust)
 [![Frontend Build Status](https://github.com/J1M-RYAN/typify/workflows/frontend/badge.svg)](https://github.com/J1M-RYAN/typify/actions?query=workflow%3Afrontend)

A web app to help me practice typing common English words

![](images/program.gif)  
### :computer: Frontend installation

This web app can be ran locally after cloning or downloading the repo.  

To install dependencies after cloning the repo run `yarn install`  

### :electric_plug: Backend installation
To compile the backend you need rust / cargo nightly.
```
rustup toolchain install nightly
rustup default nightly
```
You must also generate some ssl certs and put them in the ssl directory,
Just run the `gen_certs.sh` file.

Api Documentation is [here](rust-backend/api_docs.md)

### :keyboard: Full stack usage

To launch the app locally run the bash script `./run_stack.sh`

### :hammer: Built With

- [Rocket](https://rocket.rs/) - The backend

- [React.js](https://reactjs.org/) - The frontend library

- [Material-UI](https://material-ui.com/) - Frontend UI framework

- [Axios](https://github.com/axios/axios) - Http client for the frontend