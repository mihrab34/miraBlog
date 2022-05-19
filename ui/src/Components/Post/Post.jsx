import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reaction from "../Reaction/Reaction";
import { connectToApi } from "../../lib/helper";

export default function Post(props) {
  const [post, setPost] = useState(props.post);

  const handleLike = async () => {
    const { _id: id } = post;
    const response = await connectToApi(`/posts/${id}/like`, "PUT", post);
    setPost(response.data);
  };

  const handleDislike = async () => {
    const { _id: id } = post;
    const response = await connectToApi(`/posts/${id}/dislike`, "POST");
    setPost(response.data);
  };

  const { _id, post_title, summary, author, date } = props.post;
  return (
    <div className="card shadow-sm mb-4">
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

      <div className="card-body">
        <div className="card-title text-center py-3">
          <h3>{post_title}</h3>
        </div>
        <p className="card-text">{summary}</p>
        <div className="mx-auto text-center">
          <Link
            to={"/api/blog/post/" + _id}
            className="btn btn-sm btn-outline-info"
          >
            Continue Reading
          </Link>
        </div>

        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            By <span>{author}</span> on {new Date(date).toDateString()}
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
