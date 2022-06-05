import Link from "next/link";
import React from "react";

import SearchBar from "./SearchBar";
import styles from "@/styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>DJ Events</Link>
      </div>
      <SearchBar />
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/events/add">Add Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
