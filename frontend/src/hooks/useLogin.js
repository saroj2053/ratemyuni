import React, { useState } from "react";
import useUserContext from "../context/UserContext";
import { toast } from "react-toastify";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        throw new Error(data.message);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
