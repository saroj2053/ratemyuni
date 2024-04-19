import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useGetUniversities = () => {
  const [loading, setLoading] = useState(false);

  const getUniversities = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/university/");

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message);
      }
      return data.universities;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getUniversities };
};

export default useGetUniversities;
