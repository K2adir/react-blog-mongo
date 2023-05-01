import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../Context/UserContext";

// safe way to use innerHTML
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);

  const { userData, setUserData } = useContext(UserContext);

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
      {userData.id === postInfo.author._id && (
        <div>
          <Link to={`/edit/${postInfo._id}`}>Edit this post</Link>
        </div>
      )}
      <img src={`http://localhost:4500/${postInfo.cover}`} />
      <h1>{postInfo.title}</h1>
      <h4>{postInfo.summary}</h4>
      <h4>{postInfo.author.username}</h4>
      {console.log(postInfo.author.username)}

      {parse(`
   <p>${postInfo.content}</p>
  
  `)}
    </div>
  );
};

export default PostPage;
