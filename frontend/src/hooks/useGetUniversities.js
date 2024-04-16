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
      return data.universities;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getUniversities };
};

export default useGetUniversities;
