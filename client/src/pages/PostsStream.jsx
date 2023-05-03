import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post/Post";

const PostsStream = () => {
  const [posts, setPosts] = useState([]);
  //
  //
  useEffect(() => {
    fetch(".onrender.com/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="container">
      <h1>Recent Posts</h1>{" "}
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      <h2>
        <Link to="/blog">See All Posts</Link>
      </h2>
    </div>
  );
};

export default PostsStream;
