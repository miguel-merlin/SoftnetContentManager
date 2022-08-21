import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [fullLogo, setFullLogo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [color, setColor] = useState("");
  const [role, setRole] = useState("");
  const [runCheck, setRunCheck] = useState(true)

  return (
    <AuthContext.Provider
      value={{
        runCheck,
        setRunCheck,
        role,
        setRole,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        businessId,
        setBusinessId,
        fullLogo,
        setFullLogo,
        firstName,
        setFirstName,
        color,
        setColor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
