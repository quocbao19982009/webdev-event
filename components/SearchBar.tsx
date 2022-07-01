import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/SearchBar.module.css";

const SearchBar = () => {
  const router = useRouter();
  const [term, setTerm] = useState<string>("");

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`events/search/?term=${term}`);
    setTerm("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};

export default SearchBar;
