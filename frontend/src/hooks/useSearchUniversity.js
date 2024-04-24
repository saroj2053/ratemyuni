import React, { useState } from "react";
import toast from "react-hot-toast";

const useSearchUniversity = () => {
  const [loading, setLoading] = useState(false);
  const searchUniversity = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/university/search/${searchTerm}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
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
  return { loading, searchUniversity };
};

export default useSearchUniversity;
