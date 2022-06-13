import useAuth from "./useAuth";

const useApi = () => {
  const { auth, setAuth } = useAuth();
  const baseUrl = "http://localhost:7000/api/blog";
  let controller;
  const openCall = async (
    endpoint,
    method = "GET",
    data = null,
    upload = false
  ) => {
    controller = new AbortController();
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

  const protectedCall = async (
    endpoint,
    method = "GET",
    data = null,
    upload = false
  ) => {
    controller = new AbortController();
    const { accessToken } = auth;
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
            authorization: `Bearer ${accessToken}`,
          },
        };
        options = optionsData;
      }
    } else {
      optionsData = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      };
      options = optionsData;
    }

    const response = await fetch(baseUrl + endpoint, options);
    return response.json();
  };

  const logIn = async (user = {}) => {
    const method = "POST";
    const loginEndpoint = "/users/login";

    return await openCall(loginEndpoint, method, user);
  };

  return { openCall, protectedCall, controller, logIn, setAuth };
};

export default useApi;
