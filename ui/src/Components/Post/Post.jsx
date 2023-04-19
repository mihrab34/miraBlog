import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Reaction from "../Reaction/Reaction";
import TimeAgo from "./TimeAgo";
import { PostContext } from "../../Context/PostContext";
import useApi from "../../Hooks/useApi";

export default function Post(props) {
  const { protectedCall } = useApi();
  let blogPost = useContext(PostContext);
  if (props.post) {
    blogPost = props.post;
  }
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(blogPost);
  }, [blogPost]);

  const handleLike = async () => {
    const { _id: id } = post;
    const response = await protectedCall(`/posts/${id}/like`, "PUT");
    setPost(response.data);
  };

  const handleDislike = async () => {
    const { _id: id } = post;
    const response = await protectedCall(`/posts/${id}/dislike`, "PUT");
    setPost(response.data);
  };

  const { _id, post_title, summary, article, author, date, image } = post;
  const { single = false } = props;
  return (
    <div className="card shadow-sm mb-4">
      <img
        src={image}
        alt="Post-Cover"
        className="card-img-top"
        width="100%"
        height="750"
      />
      <div className="card-body">
        <div className="card-title text-center py-3">
          <h3>{post_title}</h3>
        </div>

        <p className="card-text">{single ? article : summary}</p>
        {!single && (
          <div className="mx-auto text-center">
            <Link to={"/post/" + _id} className="btn btn-sm btn-outline-info">
              Continue Reading
            </Link>
          </div>
        )}

        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            By <span>{author}</span> <TimeAgo date={date} />
          </div>
          <div>
            <Reaction
              handleLike={handleLike}
              handleDislike={handleDislike}
              post={post}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
