import React, { useState } from "react";
import { toast } from "react-toastify";

const useCreateReview = () => {
  const [loading, setLoading] = useState(false);

  const createReview = async (inputs) => {
    const { user, university, rating, review } = inputs;
    console.log(inputs);
    setLoading(true);
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          university: university,
          user: user,
          rating: rating,
          review: review,
        }),
      });

      console.log(response);
      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      return data.review;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, createReview };
};

export default useCreateReview;
