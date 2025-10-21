import { useMemo, useState } from "react";
import { createRandomPost } from "../utils";
import { PostContext } from "./usePosts";

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const handleAddPost = (post) => {
    setPosts((posts) => [...posts, post]);
  };

  const handleClearPosts = () => {
    setPosts([]);
  };

  const contextValue = useMemo(
    () => ({
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    }),
    [searchedPosts, searchQuery]
  );

  // 2) Provide value to component
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
