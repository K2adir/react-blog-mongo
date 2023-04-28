import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginRegisterForm/Login";
import Register from "./components/LoginRegisterForm/Register";

function App() {
  return (
    <main className="App">
      <Navigation />
      <Routes>
        <Route
          index
          element={
            <>
              <Post />
              <Post />
            </>
          }
        />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
