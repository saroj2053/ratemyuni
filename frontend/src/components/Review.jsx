import React from "react";
import { extractDate } from "../utils/extractDate";
import { getRatingColor } from "../utils/ratingBgColor";
import { FaEdit, FaTrash } from "react-icons/fa";

const Review = ({ review, currentUser, onEdit, onDelete }) => {
  const isOwner =
    currentUser && review.user && currentUser._id === review.user._id;

  return (
    <div className="pb-6 mb-6 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full text-white text-sm font-semibold flex items-center justify-center ${getRatingColor(review.rating)}`}
          >
            {review.rating}
          </div>
          <span className="text-xs text-gray-400">
            {extractDate(review.createdAt)}
          </span>
        </div>

        {isOwner && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onEdit(review)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={() => onDelete(review._id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <FaTrash size={14} />
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">{review.review}</p>
    </div>
  );
};

export default Review;
