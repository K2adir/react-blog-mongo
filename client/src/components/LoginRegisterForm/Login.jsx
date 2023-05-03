import React, { useContext, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import "./LoginRegisterForm.scss";

import { URL } from "../../App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    ////
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserData(userInfo);
        setRedirect(true);
      });
    } else {
      alert("login failed, ABC123");
    }
    ////
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter a valid username and password");
      return;
    }

    // TODO: Perform login logic

    setUsername("");
    setPassword("");
    setError("");
  };

  // if login OK, take user to home
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="form_layout">
      <h1 className="login_h1">Login</h1>
      <form className="form_tag" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
