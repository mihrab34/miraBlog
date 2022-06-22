import { useState } from "react";

const useRefreshToken = () => {
  const token = sessionStorage.getItem("refreshToken");
  const [refreshToken, setRefreshToken] = useState(token);

  const storeRefreshToken = (token = null) => {
    setRefreshToken(token);
    sessionStorage.setItem("refreshToken", token);
  };

  const clearRefreshToken = () =>{
    setRefreshToken(null);
    sessionStorage.removeItem("refreshToken");
  }
  return { storeRefreshToken, refreshToken, clearRefreshToken };
};

export default useRefreshToken;
