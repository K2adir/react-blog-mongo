import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Post.scss";

const Post = ({ title, summary, cover, createdAt, _id, author }) => {
  return (
    <>
      <Link to={`/post/${_id}`}>
        <div className="post_container">
          <div className="post_img">
            <img
              src={`https://mern-stuff-stuff-app.onrender.com/${cover}`}
              alt=""
            />
          </div>

          <div className="post_title">
            <h1>{title}</h1>
            <p>{summary}</p>

            <h4>{author.username}</h4>
            <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
