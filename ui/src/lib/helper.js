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

export let controller;

export const connectToApi = async (
  endpoint,
  method = "GET",
  data = null,
  upload = false
) => {
  controller = new AbortController();
  const baseUrl = "http://localhost:7000/api/blog";
  let options = {
    mode: "cors",
    method: method,
    signal: controller.signal,
  };

  let optionsData;
  if (data) {
    if (upload) {
      let formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      optionsData = { ...options, body: formData };
      options = optionsData;
    } else {
      optionsData = {
        ...options,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };
      options = optionsData;
    }
  } else {
    optionsData = {
      ...options,
      headers: { "Content-Type": "application/json" },
    };
    options = optionsData;
  }

  const response = await fetch(baseUrl + endpoint, options);
  return response.json();
};

export const connectToProtectedApi = async (endpoint,accessToken = "",method = "GET",data = null,upload = false) => {
  controller = new AbortController();
  const baseUrl = "http://localhost:7000/api/blog";
  let options = {
    mode: "cors",
    method: method,
    signal: controller.signal,
  };

  let optionsData;
  if (data) {
    if (upload) {
      let formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      optionsData = { ...options, body: formData };
      options = optionsData;
    } else {
      optionsData = {
        ...options,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${accessToken}`,
        },
      };
      options = optionsData;
    }
  } else {
    optionsData = {
      ...options,
      headers: { "Content-Type": "application/json" },
    };
    options = optionsData;
  }

  const response = await fetch(baseUrl + endpoint, options);
  return response.json();
};
