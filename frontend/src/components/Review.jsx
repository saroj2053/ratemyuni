import React from "react";
import { extractDate } from "../utils/extractDate";

const Review = ({ review }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-4 items-center">
          <div className="bg-green-400 w-14 h-14 rounded-full text-white font-semibold text-center flex justify-center items-center">
            {review.rating}&#9733;
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
      <div className="my-10 border-[1px] border-slate-100"></div>
    </>
  );
};

export default Review;
