import React, { useState, useEffect } from "react";
import Post from "./Post";
import useApi from "../../Hooks/useApi";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const{openCall, controller} = useApi();

  useEffect(() => {
    const getPost = async () => {
      const response = await openCall("/posts");
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
