import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4500/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function handleLogOut() {
    fetch("http://localhost:4500/logout", {
      credentials: "include",
      method: "POST",
    });
    setUsername(null);
  }

  return (
    <main>
      <nav className="nav_container">
        {username && (
          <>
            <Link to="/create">New Post</Link>
            <Link to="/" onClick={handleLogOut}>
              Logout
            </Link>
          </>
        )}
        {!username && (
          <>
            <div className="nav_links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
        <Link to="/" className="logo">
          Blog
        </Link>
      </nav>
    </main>
  );
};

export default Navigation;
