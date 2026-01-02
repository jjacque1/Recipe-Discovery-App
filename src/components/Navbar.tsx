import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!searchText.trim()) return;

    navigate(`/search?query=${searchText}`);
    setSearchText("");
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        

        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/favorites" style={styles.link}>Favorites</Link>
      </div>

      <form onSubmit={handleSearchSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
  },
  left: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
    marginRight: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  form: {
    display: "flex",
    gap: "8px",
  },
  input: {
    padding: "6px",
  },
  button: {
    padding: "6px 10px",
  },
};
