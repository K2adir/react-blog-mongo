import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import "./PostsList.scss";

function PostsList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4500/blog?page=${page}&pageSize=5`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.items);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  const handlePrev = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="posts-container">
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            className="single-post"
            key={post._id}
            title={post.title}
            summary={post.summary}
            cover={post.cover}
            _id={post._id}
            createdAt={post.createdAt}
            author={post.author}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn prev"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Previous
        </button>
        <h2 className="pagination-info">
          {page}/{totalPages}
        </h2>
        <button
          className="pagination-btn next"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostsList;
