import React, { useState, useEffect } from "react";
import Post from "./Post";
import { connectToApi } from "../../lib/helper";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let controller = new AbortController();
    const getPost = async () => {
      const response = await connectToApi("/posts", "GET", controller.signal);
      setPosts(response.data);
    };

    getPost();
    return () => controller.abort();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}
