import { createContext } from "react";
export type UserDataType = {
  username: string;
  password: string;
  loggedIn: boolean;
  skippedLogin: boolean;
};
//TODO finish usercontext
export const defaultUserData: UserDataType = {
  username: "jim",
  password: "",
  loggedIn: false,
  skippedLogin: false,
};

const UserContext = createContext<
  [UserDataType, React.Dispatch<React.SetStateAction<UserDataType>>]
>([defaultUserData, () => {}]);

export default UserContext;
