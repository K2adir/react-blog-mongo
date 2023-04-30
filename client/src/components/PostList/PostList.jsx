import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import "./PostsList.scss";

function PostsList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4500/post?page=${page}&pageSize=5`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.items);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="posts_list">
      {posts.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          summary={post.summary}
          cover={post.cover}
          _id={post._id}
          createdAt={post.createdAt}
        />
      ))}
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PostsList;
