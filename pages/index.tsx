import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <h1> Home Page</h1>
    </Layout>
  );
};

export default HomePage;
