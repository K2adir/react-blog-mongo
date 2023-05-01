import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginRegisterForm/Login";
import Register from "./components/LoginRegisterForm/Register";
import { UserContextProvider } from "./Context/UserContext";
import NewPost from "./pages/NewPost";
import PostsStream from "./pages/PostsStream";
import PostsList from "./components/PostList/PostList";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <UserContextProvider>
      <main className="App">
        <Navigation />
        {/* <Nav /> */}
        <Routes>
          <Route
            index
            element={
              <>
                <Hero />
                <PostsStream />

                <Footer />
              </>
            }
          />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/create"} element={<NewPost />} />
          <Route path={"/blog"} element={<PostsList />} />
          <Route path={"/edit/:id"} element={<EditPost />} />
          <Route path={"/post/:id"} element={<PostPage />} />
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
