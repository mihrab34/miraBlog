import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Reaction from "../Reaction/Reaction";
import { connectToApi } from "../../lib/helper";
import TimeAgo from "./TimeAgo";
import {PostContext} from "../context/PostContext";

export default function Post(props) {
  let blogPost = useContext(PostContext); ;
  if(props.post) {
    blogPost = props.post
  }
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(blogPost);
  }, [blogPost]);

  const handleLike = async () => {
    const { _id: id } = post;
    const response = await connectToApi(`/posts/${id}/like`, "PUT");
    setPost(response.data);
    alert("like post");
  };

  const handleDislike = async () => {
    const { _id: id } = post;
    const response = await connectToApi(`/posts/${id}/dislike`, "PUT");
    setPost(response.data);
  };

  const { _id, post_title, summary, article, author, date, image } = post;
  const { single = false } = props;
  return (
    <div className="card shadow-sm mb-4">
      {image ? (
        <img
          src={image}
          alt="Post-Cover"
          className="card-img-top"
          width="100%"
          height="750"
        />
      ) : (
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            Thumbnail
          </text>
        </svg>
      )}

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
