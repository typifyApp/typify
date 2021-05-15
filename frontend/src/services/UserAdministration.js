import axios from "axios";
const baseUrl = "http://localhost:8000";

const login = async (
  username,
  password,
  setLoggedIn,
  setLoginPageErrorText,
  userData,
  setUserData
) => {
  await axios
    .post(`${baseUrl}/login`, { username, password })
    .then((response) => {
      console.log("Server response", response);
      const data = response.data;
      if (data.accepted) {
        setUserData({ ...userData, username });
        setLoggedIn(data.accepted);
      } else {
        setLoginPageErrorText(data.response);
      }
    })
    .catch((error) => console.log(`Error loggin in: ${error}`));
};

const register = async (
  username,
  password,
  setLoggedIn,
  setLoginPageErrorText,
  userData,
  setUserData
) => {
  await axios
    .post(`${baseUrl}/register`, { username, password })
    .then((response) => {
      console.log("Server response", response);
      const data = response.data;
      if (data.accepted) {
        setUserData({ ...userData, username });
        setLoggedIn(data.accepted);
      } else {
        setLoginPageErrorText(data.response);
      }
    })
    .catch((error) => console.log(`Error loggin in: ${error}`));
};

const UserAdministration = {
  login,
  register,
};

export default UserAdministration;
