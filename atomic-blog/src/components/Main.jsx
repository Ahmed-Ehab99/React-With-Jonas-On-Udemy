import React, { memo } from "react";
import FormAddPost from "./FormAddPost";
import Posts from "./Posts";

const Main = memo(() => {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

export default Main;
