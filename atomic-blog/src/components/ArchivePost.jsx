const ArchivePost = ({ post, onAddPost }) => {
  const handleClick = () => {
    onAddPost(post);
  };

  return (
    <li>
      <p>
        <strong>{post.title}:</strong> {post.body}
      </p>
      <button onClick={handleClick}>Add as new post</button>
    </li>
  );
};

export default ArchivePost;
