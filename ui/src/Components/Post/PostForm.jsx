import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../Hooks/useApi";

const initialValues = {
  image: "",
  article: "",
  author: "",
  comment_count: 0,
  date: new Date(),
  dislike_count: 0,
  like_count: 0,
  post_title: "",
  summary: "",
  view_count: 0,
};

export default function PostForm(props) {
  const { uploadCall} = useApi();
  const [post, setPost] = useState(initialValues);
  const { id } = useParams();

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    if (type === "file") {
      setPost({ ...post, [name]: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const action = props.action;
    switch (action) {
      case "add":
        await uploadCall("/posts", "POST", post);
        break;
      case "edit":
        await uploadCall("/posts/" + id, "PUT", post);
        break;
      default:
        break;
    }
  };

  return (
    <form className="pt-5">
      <div className="mb-3">
        <label htmlFor="task" className="form-label">
          Post Cover
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="task"
          placeholder="Enter Name"
          name="author"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="post_title"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="summary"
          rows="3"
          placeholder="Write Article Summary...."
          name="summary"
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="article"
          rows="50"
          placeholder="Write Article...."
          name="article"
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-success" onClick={handleSubmit}>
        Publish
      </button>
    </form>
  );
}
