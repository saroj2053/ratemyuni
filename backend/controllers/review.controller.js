import Review from "../models/review.model.js";
import University from "../models/university.model.js";
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

export const addReview = async (req, res) => {
  try {
    const { university, user, rating, review } = req.body;

    if (!university) {
      return response(res, 400, false, "University id is required");
    }

    if (!user) {
      return response(res, 400, false, "User must be logged in to add review");
    }

    if (!rating) {
      return response(res, 400, false, "Please provide value for rating field");
    }

    if (rating < 1 || rating > 5) {
      return response(res, 400, false, "Rating must be within 1 and 5");
    }

    if (!review) {
      return response(res, 400, false, "Review contents must be included");
    }

    if (review.length < 50) {
      return response(
        res,
        400,
        false,
        "Review must be atleast 50 characters long"
      );
    }

    const newReview = new Review({ user, university, rating, review });
    await newReview.save();

    const universityId = university;

    const universityData = await University.findById(universityId);

    universityData.reviews.push(newReview._id);

    await universityData.save();

    if (newReview) {
      res.status(201).json({
        success: true,
        message: "Review saved successfully",
        review: newReview,
      });
    } else {
      return response(res, 400, false, "Error saving modules");
    }
  } catch (error) {
    console.log("Error in addReview controller", error.message);
    return response(res, 500, false, "Internal Server Error");
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    await Review.findByIdAndDelete(reviewId);

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log("Error in deleteReview controller", error.message);
    response(res, 500, false, "Internal server error");
  }
};

export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      {
        rating: req.body.rating,
        review: req.body.review,
      },
      { new: true }
    );

    console.log(review);

    res
      .status(200)
      .json({ success: true, message: "Review updated successfully", review });
  } catch (error) {
    console.log("Error in deleteReview controller", error.message);
    response(res, 500, false, "Internal server error");
  }
};
