import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connectToApi } from "../../lib/helper";
import Post from "./Post";
import CommentList from "../Comment/CommentList";
import {PostContext} from "../context/PostContext";

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
      <PostContext.Provider value={singlePost}>
        <Post single={true} />
        <CommentList />
      </PostContext.Provider>
    </>
  );
}
