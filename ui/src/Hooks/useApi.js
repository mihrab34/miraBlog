import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useNavigate } from "react-router-dom";

const useApi = () => {
  const { refreshToken, clearRefreshToken } = useRefreshToken();
  const { auth, setAuth } = useAuth();
  let navigate = useNavigate();
  const baseUrl = "http://localhost:7000/api/blog";
  let request = new Request(baseUrl);
  let controller;
  const openCall = async (
    endpoint,
    method = "GET",
    data = null,
  ) => {
    try {
      controller = new AbortController();
      let options = {
        mode: "cors",
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        signal: controller.signal,
      };

      let optionsData;
      if (data) {
        optionsData = { ...options, body: JSON.stringify(data) };
        options = optionsData;
      }
      options = optionsData;

      const response = await fetch(baseUrl + endpoint, options);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const apiCall = async (endpoint, method = "GET", data = null) => {
    try {
      controller = new AbortController();
      let options = {
        mode: "cors",
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: controller.signal,
      };

      let optionsData;
      if (data) {
        optionsData = { ...options, body: JSON.stringify(data) };
        options = optionsData;
      }
      options = optionsData;
      const response = await fetch(baseUrl + endpoint, options);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = async () => {
    const method = "POST";
    const refreshEndpoint = "/users/refresh";
    try {
      const response = await openCall(refreshEndpoint, method, {
        refreshToken,
      });
      if (response.status) {
        setAuth(response.data);
        request.headers.delete("Authorization");
        request.headers.append(
          "Authorization",
          `Bearer ${response.data.accessToken}`
        );
        const output = await fetch(request);
        if (output.status === 200) {
          return output.json();
        } else {
          return output;
        }
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const protectedCall = async (endpoint, method = "GET", data = null) => {
    try {
      controller = new AbortController();
      const { accessToken } = auth;
      let options = {
        mode: "cors",
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      };
      let optionsData;
      if (data) {
        optionsData = { ...options, body: JSON.stringify(data) };
        options = optionsData;
      }
      request = new Request(baseUrl + endpoint, options);
      const response = await fetch(request);

      if (parseInt(response.status) == 401) {
        return await refresh();
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadCall = async (endpoint, method = "GET", data = null) => {
    try {
      controller = new AbortController();
      const { accessToken } = auth;

      let formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      let options = {
        mode: "cors",
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      };

      const response = await fetch(baseUrl + endpoint, options);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (user = {}) => {
    const method = "POST";
    const loginEndpoint = "/users/login";
    return await openCall(loginEndpoint, method, user);
  };

  const logout = async () => {
    try {
      alert("You have been logged out");
      const method = "POST";
      const logoutEndpoint = "/users/logout";
      const response = await apiCall(logoutEndpoint, method, {refreshToken});
      if (response.ok) {
        clearRefreshToken();
        setAuth({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    openCall,
    protectedCall,
    uploadCall,
    controller,
    logIn,
    logout,
    setAuth,
    auth,
    refreshToken,
  };
};

export default useApi;
