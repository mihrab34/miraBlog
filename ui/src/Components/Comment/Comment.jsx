import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TimeAgo from "../Post/TimeAgo";
import ReplyButton from "../Reply/ReplyButton";
function Comment(props) {
  const [comment, setComment] = useState(props.comment);
  const { author, text, date } = comment;
  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);
  return (
    <>
      <div className="d-flex p-4">
        <div className="card-body list-group" style={{ fontStyle: "italic" }}>
          <div className="list-group-item">
            <p className="mt-1">
              Comment by {author} {<TimeAgo date={date} />}
            </p>
            <p>Comment : {text}</p>
            <hr />
            
            <ReplyButton />
          </div>
        </div>
      </div>
    </>
  );
}
export default Comment;
