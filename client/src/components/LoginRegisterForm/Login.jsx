import React, { useState } from "react";
import { Navigate } from "react-router";
import "./LoginRegisterForm.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4500/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    ////
    if (response.ok) {
      setRedirect(true);
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
