import Link from "next/link";
import React from "react";

import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Copyright &copy; DJ Events</p>
      <p>
        <Link href="/about">About this page</Link>
      </p>
    </div>
  );
};

export default Footer;
