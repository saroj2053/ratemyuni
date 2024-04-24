import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const deleteReview = async (reviewId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/review/delete/${reviewId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      toast.success(data.message);
      if (data.success === true) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteReview };
};

export default useDeleteReview;
