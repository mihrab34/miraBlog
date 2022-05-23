export default function PostForm(props) {
  return (
    <form className="pt-5">
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
          name="title"
        />
      </div>
      <div className="mb-3">
        
        <textarea
          className="form-control"
          id="article"
          rows="50"
          placeholder="Write Article...."
          name="article"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-success">
        Publish
      </button>
    </form>
  );
}
