import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}

const Layout = ({
  title = "WebDev Event | Let's talk about coding",
  description = "Find events to discuss, meet same minded developer that passinate about web development",
  keywords = "web, development, coding",
  children,
}: LayoutProps) => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {pathName === "/" && <Showcase />}
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
