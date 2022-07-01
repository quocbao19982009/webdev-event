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
  console.log(error, "in context");
  const router = useRouter();
  // Checking if user login in every request
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register User
  const register = async (user: UserInputInterface) => {
    console.log(user, "in context");

    const res = await fetch(`${process.env.NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setTimeout(() => setError(null));
    }
  };

  // Login user
  const login = async ({ email: identifier, password }: UserInputInterface) => {
    const res = await fetch(`${process.env.NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setTimeout(() => setError(null));
    }
  };
  // Logout User
  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };
  // Check if user Login
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${process.env.NEXT_URL}/api/user`);
    const user = await res.json();

    console.log("checkUserLoggedIn Run");

    if (res.ok) {
      setUser(user);
    } else {
      setUser(null);
    }
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
