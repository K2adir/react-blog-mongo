import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// safe way to use innerHTML
import parse from "html-react-parser";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4500/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div>
      <img src={`http://localhost:4500/${postInfo.cover}`} />
      <h1>{postInfo.title}</h1>
      <h4>{postInfo.summary}</h4>
      {parse(`
   <p>${postInfo.content}</p>
  
  `)}
    </div>
  );
};

export default PostPage;
