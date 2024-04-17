import React, { useState } from "react";
import { toast } from "react-toastify";

const useGetUniversityDetails = () => {
  const [loading, setLoading] = useState(false);

  const getUniversityDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/university/${id}`);
      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUniversityDetails };
};

export default useGetUniversityDetails;
