import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";
import { UserContext } from "../../Context/UserContext";

const Navigation = () => {
  const { setUserData, userData } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4500/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserData(userInfo);
      });
    });
  }, []);

  function handleLogOut() {
    fetch("http://localhost:4500/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserData(null);
  }

  const username = userData?.username;

  return (
    <main>
      <nav className="nav_container container">
        {username && (
          <>
            <Link to="/" className="logo">
              Home
            </Link>
            <Link to="/blog">All Posts</Link>
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
      </nav>
    </main>
  );
};

export default Navigation;
