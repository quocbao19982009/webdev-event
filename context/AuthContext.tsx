import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import UserInputInterface from "@/types/userInputInterface";

interface AuthContextInterface {
  user: any;
  error: any;
  register: (user: UserInputInterface) => Promise<void>;
  login: ({ email, password }: UserInputInterface) => Promise<void>;
  logout: () => void;
  checkUserLoggedIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register User
  const register = async (user: UserInputInterface) => {
    console.log(user);
  };

  // Login user
  const login = async ({ email: identifier, password }: UserInputInterface) => {
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      setTimeout(() => setError(null));
    }
  };
  // Logout User
  const logout = () => {
    console.log("logout");
  };
  // Check if user Login
  const checkUserLoggedIn = async () => {
    console.log("check");
  };

  const contextValue = {
    user,
    error,
    register,
    login,
    logout,
    checkUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
