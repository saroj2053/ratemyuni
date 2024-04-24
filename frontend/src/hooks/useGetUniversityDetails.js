import React, { useState } from "react";
import toast from "react-hot-toast";

const useGetUniversityDetails = () => {
  const [loading, setLoading] = useState(false);

  const getUniversityDetails = async (uniID) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/university/${uniID}`);

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUniversityDetails };
};

export default useGetUniversityDetails;
