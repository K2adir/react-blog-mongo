import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginRegisterForm/Login";
import Register from "./components/LoginRegisterForm/Register";
import { UserContextProvider } from "./Context/UserContext";
import NewPost from "./pages/NewPost";
function App() {
  return (
    <UserContextProvider>
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
          <Route path={"/create"} element={<NewPost />} />
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
