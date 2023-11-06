import { createContext, useContext, useEffect, useState } from "react";
import Router from "next/router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof window !== "undefined" && !!localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (res, username) => {
          localStorage.setItem("at", res.data.access_token);
          localStorage.setItem("rt", res.data.refresh_token);
          localStorage.setItem("expire", res.data.expires_in);
          localStorage.setItem("user", username);
          setUser(username);
        },
        logout: () => {
          localStorage.clear();
          setUser(undefined);
          Router.push("/");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authMethods = useContext(AuthContext);
  if (!authMethods) {
    throw new TypeError("Please use within CartProvider");
  }

  return authMethods;
}
