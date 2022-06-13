import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../Context/PostContext";
import Comment from "./Comment";
import useApi from "../../Hooks/useApi";

export default function CommentList() {
  const post = useContext(PostContext);
  const [comments, setComments] = useState([]);
  const { _id: id } = post;
  const { protectedCall } = useApi();

  useEffect(() => {
    const getComments = async () => {
      if (id) {
        const response = await protectedCall("/posts/" + id + "/comments");
        setComments(response.data);
      } else {
      }
    };
    getComments();
  }, [id]);
  return (
    <>
      {comments
        ? comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        : ""}
    </>
  );
}
