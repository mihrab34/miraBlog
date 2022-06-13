import React, { useState, useContext, useEffect }from "react";
import {PostContext} from "../context/PostContext";
import {connectToApi} from "../../lib/helper";
import Comment from "./Comment";

export default function CommentList () {
    const post = useContext(PostContext)
    const [comments, setComments] = useState([]);
    const { _id: id} = post;

    useEffect(() => {
        const getComments = async () => {
            if(id) {
                const response = await connectToApi(
                  "/posts/" + id + "/comments"
                );
                setComments(response.data);
            }
        }
        getComments();
    }, [id])
    return (
      <>
        {comments? comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        )): ""}
      </>
    );
}