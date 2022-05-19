import { useLocation, useNavigate, useParams } from "react-router-dom";
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export let controller = new AbortController()

export const connectToApi = async (endpoint, method = "GET", signal=null, data = null) => {
  const baseUrl = "http://localhost:5050/api/blog";
  let options = {
    mode: "cors",
    method: method,
    signal: signal ? signal : controller.signal,
    headers: { "Content-Type": "application/json" },
  };

  if (data) {
    let optionsData = { ...options, body: JSON.stringify(data) };
    options = optionsData;
  }
  const response = await fetch(baseUrl + endpoint, options);
  return response.json();
};
