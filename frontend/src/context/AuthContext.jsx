import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // temporary values
  const [isLoggedIn] = useState(true);

  const [isApproved] = useState(true);

  const [user] = useState({
    name: "Trade User",
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isApproved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}