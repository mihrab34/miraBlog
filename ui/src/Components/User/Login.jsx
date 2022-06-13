import {useState, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {connectToProtectedApi} from "../../lib/helper";

export default function Login() {
let auth = useContext(AuthContext);
const[user, setUser] = useState({})
 const handleLogin =()=>{};
  return (
    <form>
      <h1 className="h3 mb-3 fw-normal text-center text-capitalize">Please sign in</h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control mb-3"
          id="floatingInput"
          placeholder="Username"
        />
        <label for="floatingInput">UserName</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control mb-3"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-info" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
    </form>
  );
}
