import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { slugify } from "../../utils/slugify";
import { getRatingColor } from "../../utils/ratingBgColor";
import { calculateAverageRating } from "../../utils/calculateAverageRating";

const University = ({ university }) => {
  const navigate = useNavigate();

  const truncate = (str, n) =>
    str?.length > n ? str.slice(0, n) + "..." : str;

  const averageRating = calculateAverageRating(university?.reviews);

  return (
    <div
      onClick={() =>
        navigate(`/university/${slugify(university.name)}`, {
          state: { id: university._id },
        })
      }
      className="flex flex-col w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-center justify-center h-40 bg-gray-50 p-6">
        <img
          className="max-h-full max-w-full object-contain"
          src={`/static/logos/${university.logo}`}
          alt={university.name}
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {university.name || <Skeleton />}
        </h2>

        <p className="text-sm text-gray-500 mb-1">
          {university.location || <Skeleton />}
        </p>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed flex-1">
          {truncate(university.description, 120) || <Skeleton count={3} />}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {university.reviews?.length > 0 ? (
            <div
              className={`w-11 h-11 rounded-full text-white text-sm font-semibold flex items-center justify-center ${getRatingColor(
                Number(averageRating)
              )}`}
            >
              {averageRating}
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-gray-200 text-gray-400 text-xs flex items-center justify-center">
              N/A
            </div>
          )}

          <span className="text-sm font-medium text-gray-500">
            {university.reviews?.length || 0} review
            {university.reviews?.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default University;
