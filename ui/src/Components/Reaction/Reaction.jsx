export default function Reaction(props) {
  const { like_count, dislike_count, view_count } = props.post;
  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center">
        <div className="px-2">
          <span className="px-2">{view_count}</span>
          views
        </div>
        <div className="px-2">
          <button className="btn px-1" onClick={props.handleLike}>
            <i className="bi bi-hand-thumbs-up"></i>
          </button>
          {like_count <= 0 ? <span>like</span> : <span>{like_count}</span>}
        </div>
        <div className="px-2">
          <button className="btn px-1" onClick={props.handleDislike}>
            <i className="bi bi-hand-thumbs-down"></i>
          </button>
          <span>{dislike_count}</span>
        </div>
      </div>
    </>
  );
}
