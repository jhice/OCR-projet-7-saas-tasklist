import { useEffect, useState } from "react";

export default function useToken() {

  // getToken() gère l'état par défaut
  const [token, setToken] = useState();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(localStorage.getItem("token"));
  }, []);

  const saveToken = userToken => {
    // localStorage.setItem("token", JSON.stringify(userToken));
    localStorage.setItem("token", userToken);
    setToken(userToken);
    console.log("token saved", userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };

}