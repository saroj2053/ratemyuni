import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useCreateUniversity = () => {
  const [loading, setLoading] = useState(false);

  const createUniversity = async (formData, requestData) => {
    setLoading(true);

    try {
      const fileResponse = await axios.post("/api/upload-logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (fileResponse.data.success === false) {
        throw new Error(error.message);
      }

      console.log(fileResponse.data.logo);
      const logo = fileResponse.data.logo.filename;

      const universityData = { ...requestData, logo: logo };

      const response = await fetch("/api/university/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(universityData),
      });

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, createUniversity };
};

export default useCreateUniversity;
