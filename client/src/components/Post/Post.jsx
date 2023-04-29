import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import "./Post.scss";

const Post = ({ title, summary, cover, createdAt }) => {
  return (
    <div className="post_container">
      <img src={cover} alt="" />
      <div className="post_title">
        <h1>{title}</h1>
        <p>{summary}</p>
        <Link>Author</Link>
        <time>{formatISO9075(new Date(createdAt))}</time>
      </div>
    </div>
  );
};

export default Post;
