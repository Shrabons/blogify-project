import { useContext, useDebugValue } from "react";
import { AuthenticationContext } from "../context";

export const useAuthenticatin = () => {
  const { auth } = useContext(AuthenticationContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext(AuthenticationContext);
};
