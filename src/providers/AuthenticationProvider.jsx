import { useState } from "react";
import { AuthenticationContext } from "../context";

const AuthenticationProvider = ({ children }) => {
  const [auth, setAuth] = useState([]);

  return (
    <AuthenticationContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
