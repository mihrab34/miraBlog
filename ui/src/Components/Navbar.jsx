import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <strong>Home</strong>
          </Link>
          <div className="navbar-toggler">
            <Link to="post/add" className="btn btn-dark">
              New Post
            </Link>
          </div>
          <ul className="navbar-nav justify-content-end ">
            <li className="nav-item"><Link to="/login" className="nav-link">Sign In</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
