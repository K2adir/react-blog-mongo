import React, { useEffect, useState } from "react";
import Post from "../components/Post/Post";

const PostsStream = () => {
  const [posts, setPosts] = useState([]);
  //
  //
  useEffect(() => {
    fetch("http://localhost:4500/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
};

export default PostsStream;
