import React, { useState } from "react";
import { extractDate } from "../utils/extractDate";
import { getRatingColor } from "../utils/ratingBgColor";
import useUserContext from "../context/UserContext";
import { FaPencil, FaTrash } from "react-icons/fa6";
import useDeleteReview from "../hooks/useDeleteReview";
import { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import useEditReview from "../hooks/useEditReview";

const Review = ({ review, onDelete, onEdit }) => {
  const { user } = useUserContext();
  const { loading, deleteReview } = useDeleteReview();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(review?.rating);
  const [newReview, setNewReview] = useState(review?.review);

  const { editReview } = useEditReview();

  const deleteReviewHandler = async () => {
    await deleteReview(review?._id);
    onDelete(review?._id);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleEditReview = async (evt) => {
    evt.preventDefault();
    await editReview(review._id, newRating, newReview);
    setIsEditModalOpen(false);
    document.body.style.overflow = "auto";
    onEdit(review?._id, { rating: newRating, review: newReview });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col md:w-[85%]">
          <div className="flex gap-4 items-center">
            <div
              className={` ${getRatingColor(
                review.rating
              )} w-14 h-14 rounded-full text-white font-semibold text-center flex justify-center items-center`}
            >
              {review.rating} &#9733;
            </div>
            <h2 className="text-md font-bold text-slate-600">
              {extractDate(review.createdAt)}
            </h2>
          </div>
          <div>
            <p className="text-sm text-slate-600 text-semibold py-4">
              {review.review}
            </p>
          </div>
        </div>
        <div>
          {review.user === user?._id && (
            <div className="flex gap-10">
              <button
                className="border-none outline-none bg-amber-600 text-slate-50 px-2 py-1 w-10 h-10 rounded-full flex justify-center items-center"
                onClick={handleEditModalOpen}
              >
                <FaPencil />
              </button>
              <button
                className="border-none outline-none bg-red-600 text-slate-50 px-2 py-1 w-10 h-10 rounded-full flex  justify-center items-center"
                onClick={deleteReviewHandler}
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
        {isEditModalOpen && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
            <Modal onClose={handleEditModalClose}>
              <h2 className="text-3xl text-slate-700 font-semibold my-4">
                Edit Review
              </h2>
              <form action="">
                <div className="flex flex-col gap-2 my-6">
                  <label
                    htmlFor="rating"
                    className="font-xl font-semibold text-slate-600"
                  >
                    Rating:
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min={1}
                    max={5}
                    value={newRating}
                    onChange={(evt) => setNewRating(evt.target.value)}
                    className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3 "
                  />
                  <p className="text-sm text-slate-500">
                    Rating should be between 1 and 5
                  </p>
                </div>
                <div className="flex flex-col gap-2 my-6">
                  <label
                    htmlFor="review"
                    className="font-xl font-semibold text-slate-600"
                  >
                    Review:
                  </label>
                  <textarea
                    rows={10}
                    name="review"
                    value={newReview}
                    onChange={(evt) => setNewReview(evt.target.value)}
                    className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3 "
                  />
                  <p className="text-sm text-slate-500">
                    Review length should be atleast 50 characters long
                  </p>
                </div>
              </form>
              <div className="flex justify-between items-center">
                <button
                  className="boutline-none bg-green-600 text-slate-100 px-4 py-1 rounded-md tracking-wider hover:bg-green-500"
                  onClick={handleEditReview}
                >
                  Submit
                </button>
                <button
                  className="outline-none bg-red-600 text-slate-100 px-4 py-1 rounded-md tracking-wider hover:bg-red-500"
                  onClick={handleEditModalClose}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </>
        )}
        <Toaster />
      </div>
      <div className="my-10 border-[1px] border-slate-100"></div>
    </>
  );
};

export default Review;
