import React, { memo, useState } from "react";
import { usePosts } from "../providers/usePosts";
import { createRandomPost } from "../utils/index";
import ArchivePost from "./ArchivePost";

const Archive = memo(() => {
  const [posts] = useState(() =>
    Array.from({ length: 10000 }, () => createRandomPost())
  );
  const { onAddPost } = usePosts();
  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <ArchivePost key={i} post={post} onAddPost={onAddPost} />
          ))}
        </ul>
      )}
    </aside>
  );
});

export default Archive;
