import React, { createContext, useContext } from "react";

export const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
