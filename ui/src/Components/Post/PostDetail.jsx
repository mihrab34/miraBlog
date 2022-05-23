import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connectToApi } from "../../lib/helper";
import Post from "./Post";

export default function PostDetail() {
  const [singlePost, setSinglePost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await connectToApi(`/posts/${id}`);
      setSinglePost(response.data);
    };
    getPost();
  }, [id]);

  return (
    <>
      <Post post={singlePost} single={true} />
    </>
  );
}
