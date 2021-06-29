import { createContext, useState } from "react";
export type UserDataType = {
  username: string;
  loggedIn: boolean;
};
//TODO finish usercontext
export const defaultUserData: UserDataType = {
  username: "jim",
  loggedIn: false,
};

const UserContext = createContext<
  [UserDataType, React.Dispatch<React.SetStateAction<UserDataType>>]
>([defaultUserData, () => {}]);

export default UserContext;
