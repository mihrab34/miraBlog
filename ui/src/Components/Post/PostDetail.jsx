import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import CommentList from "../Comment/CommentList";
import { PostContext } from "../../Context/PostContext";
import useApi from "../../Hooks/useApi";

export default function PostDetail() {
  const [singlePost, setSinglePost] = useState({});
  const { id } = useParams();
  const { protectedCall } = useApi();

  useEffect(() => {
    const getPost = async () => {
      const response = await protectedCall(`/posts/${id}`);
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
