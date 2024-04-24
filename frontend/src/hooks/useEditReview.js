import React, { useState } from "react";
import toast from "react-hot-toast";

const useEditReview = () => {
  const [loading, setLoading] = useState(false);
  const editReview = async (reviewId, rating, review) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/review/update/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: rating, review: review }),
      });

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message);
      }

      console.log(data);

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, editReview };
};

export default useEditReview;
