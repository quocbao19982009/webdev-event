import Link from "next/link";
import React, { useContext } from "react";

import SearchBar from "./SearchBar";
import styles from "@/styles/Header.module.css";
import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "context/AuthContext";

const Header = () => {
  const ctx = useContext(AuthContext);
  const user = ctx?.user;
  const logout = ctx?.logout;

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
          {user && (
            <>
              <li>
                <Link href="/events/add">Add Events</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={() => logout!()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignInAlt /> Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  <FaSignInAlt /> Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
