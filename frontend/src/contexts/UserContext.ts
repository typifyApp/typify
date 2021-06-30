import { createContext } from "react";
export type UserDataType = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  loggedIn: boolean;
  skippedLogin: boolean;
};
//TODO finish usercontext
export const defaultUserData: UserDataType = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  loggedIn: false,
  skippedLogin: false,
};

const UserContext = createContext<
  [UserDataType, React.Dispatch<React.SetStateAction<UserDataType>>]
>([defaultUserData, () => {}]);

export default UserContext;
