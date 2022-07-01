import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { AuthContext } from "context/AuthContext";

const LoginPage = () => {
  const ctx = useContext(AuthContext);
  const login = ctx!.login;
  const error = ctx!.error;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    login({ email, password });
  };

  useEffect(() => {
    error && toast.error(error);
  });

  return (
    <Layout title="User Login">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn ">Login</button>
        </form>
        <p>
          Dont't have an account?{" "}
          <Link href="/account/register">Register here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
