import "./Nav.scss";
import React, { useState } from "react";

const Nav = () => {
  const [navVisible, setNavVisible] = useState(false);

  const showNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="">
      <nav className="nav_desktop nav_container">
        <li>desktop</li>
        <li>desktop</li>
        <li>desktop</li>
      </nav>
      <button onClick={showNav}>Show</button>
      <nav className={`nav_mobile${navVisible ? "__hide" : ""}`}>
        <li>mobile</li>
        <li>mobile</li>
        <li>mobile</li>
      </nav>
    </div>
  );
};

export default Nav;
