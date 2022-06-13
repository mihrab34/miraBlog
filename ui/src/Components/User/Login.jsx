import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi";

export default function Login() {
  let navigate = useNavigate();
  const { logIn, setAuth } = useApi();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.id]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await logIn(user);
    if (response.status) {
      setAuth(response.data);
      navigate("/");
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1 className="h3 mb-3 fw-normal text-center text-capitalize">
        Please sign in
      </h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control mb-3"
          id="username"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="username">Username</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password">Password</label>
      </div>

      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-info" type="submit">
        Sign in
      </button>
      <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
    </form>
  );
}
