import axios from "axios";
const baseUrl = "http://localhost:8000/";

const login = async (username, password, setLoggedIn) => {
  await axios
    .post(`${baseUrl}/login`, { username, password })
    .then((response) => setLoggedIn(true))
    .catch((error) => console.log(`Error loggin in: ${error}`));
};
const loginDummy = async (username, password, setLoggedIn) => {
  setLoggedIn(true);
};
const register = async (username, password, setLoggedIn) => {
  await axios
    .post(`${baseUrl}/register`, { username, password })
    .then((response) => setLoggedIn(true))
    .catch((error) => console.log(`Error loggin in: ${error}`));
};

const UserAdministration = {
  login,
  loginDummy,
  register,
};

export default UserAdministration;
