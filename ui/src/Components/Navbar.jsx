import { Link } from "react-router-dom";
import useApi from "../Hooks/useApi";

export default function Navbar() {
  const { refreshToken, auth, logout } = useApi();
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
            {auth.user || refreshToken ? (
              <button className="btn btn-light" onClick={() =>logout()}>
                LogOut
              </button>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
