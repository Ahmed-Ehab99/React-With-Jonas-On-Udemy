import React from "react";
import { usePosts } from "../providers/usePosts";

const Results = () => {
  const { posts } = usePosts();
  return <p>🚀 {posts.length} atomic posts found</p>;
};

export default Results;
