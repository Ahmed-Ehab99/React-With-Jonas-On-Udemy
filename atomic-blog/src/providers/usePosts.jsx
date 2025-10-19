import { createContext, useContext } from "react";

// 1) Create a context
export const PostContext = createContext();

export function usePosts() {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}
