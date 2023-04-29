import "./Post.scss";

const Post = ({ title, summary, cover }) => {
  return (
    <div className="post_container">
      <img src={cover} alt="" />
      <div className="post_title">
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
