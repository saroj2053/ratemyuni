import Review from "../models/review.model.js";
import response from "../utils/generateResponse.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = Review.find({});
    if (!reviews) {
      return response(res, 404, false, "Sorry, No reviews found");
    } else {
      res.status(200).json({
        success: true,
        message: "Reviews retrieved successfully",
        reviews: reviews,
      });
    }
  } catch (error) {
    console.log("Error in getReviews controller", error.message);
    return response(res, 500, false, "Internal server error");
  }
};
