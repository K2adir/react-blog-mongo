import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Post.scss";

const Post = ({ title, summary, cover, createdAt, _id }) => {
  return (
    <div className="post_container">
      <Link to={`/post/${_id}`}>
        <img src={`http://localhost:4500/${cover}`} alt="" />
      </Link>
      <div className="post_title">
        <Link to={`/post/${_id}`}>
          <h1>{title}</h1>
          <p>{summary}</p>
        </Link>
        <Link>Author</Link>
        <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
      </div>
    </div>
  );
};

export default Post;
