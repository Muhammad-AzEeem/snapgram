// == step 21 create this all code

import { createContext, useContext, useEffect, useState } from "react";
import { IContextType, IUser } from "../types";
import { getCurrentUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // == step 23
  async function checkAuthUser() {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        // console.log("User is authenticated");
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      if (!currentAccount) throw Error;
    } catch (error) {
      console.error("Authentication Error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  // == step 24
  useEffect(function () {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (cookieFallback === "[]" || cookieFallback === null) {
      navigate("/sign-in");
    }
    checkAuthUser();
  }, []);

  // == step 25
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);

// == step 22 in api.ts
// == step 26 in SignUpForm
