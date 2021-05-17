import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${document.location}/api`
    : "http://localhost:8000/api";

const login = async (
  username,
  password,
  setLoggedIn,
  setLoginPageErrorText,
  userData,
  setUserData,
  setSkippedLogin,
  setCurrentScreen,
  currentScreen,
  updateScreen
) => {
  await axios
    .post(`${baseUrl}/login`, { username, password })
    .then((response) => {
      console.log("Server response", response);
      const data = response.data;
      if (data.accepted) {
        setUserData({ ...userData, username });
        setLoggedIn(data.accepted);
        updateScreen(currentScreen, "mainTyping");
        localStorage.setItem("username", username);
        localStorage.setItem("loggedIn", true);
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
  setUserData,
  setSkippedLogin,
  setCurrentScreen,
  currentScreen,
  updateScreen
) => {
  await axios
    .post(`${baseUrl}/register`, { username, password })
    .then((response) => {
      console.log("Server response", response);
      const data = response.data;
      if (data.accepted) {
        localStorage.setItem("username", username);
        localStorage.setItem("loggedIn", true);
        setUserData({ ...userData, username });
        setLoggedIn(data.accepted);
        updateScreen(currentScreen, "mainTyping");
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
