import React, { useState } from "react";
import toast from "react-hot-toast";
import useUserContext from "../context/UserContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const signup = async ({
    name,
    email,
    password,
    confirmPassword,
    userType,
  }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          password,
          confirmPassword,
          userType,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
