import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <main>
      <nav className="nav_container">
        <Link to="/" className="logo">
          Blog
        </Link>
        <div className="nav_links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </main>
  );
};

export default Navigation;
