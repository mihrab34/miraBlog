import React, { useState, useEffect } from "react";
import Post from "./Post";
import { connectToApi, controller } from "../../lib/helper";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const response = await connectToApi("/posts");
      setPosts(response.data);
    };

    getPost();
    return () => {
      controller && controller.abort();
    }
  }, []);
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}
