import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navi.scss";
import { UserContext } from "../../Context/UserContext";

const Navi = () => {
  const { setUserData, userData } = useContext(UserContext);
  const [navVisible, setNavVisible] = useState(true);

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
  const showNav = () => {
    setNavVisible(!navVisible);
  };

  const username = userData?.username;

  return (
    <main>
      <nav className="nav_container container">
        <div className="nav_hamburger">
          <h1 className="nav_hamburger" onClick={showNav}>
            Menu
          </h1>
        </div>
        <div className={`nav_mobile${navVisible ? "__hide" : ""}`}>
          {username ? (
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
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </main>
  );
};

export default Navi;
