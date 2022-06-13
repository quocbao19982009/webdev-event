import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { AuthContext } from "context/AuthContext";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const ctx = useContext(AuthContext);

  const register = ctx!.register;
  const error = ctx!.error;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Password Not Match");
    }

    register({ username, email, password });
  };

  useEffect(() => {
    error && toast.error(error);
  });
  return (
    <Layout title="User Login">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="userName">User Name:</label>
          <input
            id="userName"
            type={"userName"}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
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
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            id="passwordConfirm"
            type={"password"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button className="btn ">Login</button>
        </form>
        <p>
          Have an account? <Link href="/account/login">Login here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
