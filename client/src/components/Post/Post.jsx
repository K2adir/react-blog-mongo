import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Post.scss";

const Post = ({ title, summary, cover, createdAt }) => {
  return (
    <div className="post_container">
      <img src={cover} alt="" />
      <div className="post_title">
        <h1>{title}</h1>
        <p>{summary}</p>
        <Link>Author</Link>
        <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
      </div>
    </div>
  );
};

export default Post;
