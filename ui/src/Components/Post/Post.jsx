import {Link} from 'react-router-dom'

export default function Post(props) {
  return (
    <div class="card shadow-sm">
      <svg
        class="bd-placeholder-img card-img-top"
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

      <div class="card-body">
        <p class="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <div className="mx-auto text-center">
          <Link to={"/api/blog/post/1"} class="btn btn-sm btn-outline-secondary">
            Continue Reading
          </Link>
        </div>

        <hr />
        <div class="d-flex justify-content-between align-items-center">
          <p>By Author's name</p>
          <small class="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  );
}
