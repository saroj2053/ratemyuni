import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { slugify } from "../../utils/slugify";
import AppLayout from "./AppLayout";

const University = ({ university }) => {
  const navigate = useNavigate();
  const getFirstCharactersUptoN = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const logoUri = `http://localhost:8000/static/logos/${university.logo}`;

  const slugifiedUniversityName = slugify(university.name);

  const universityClickHandler = () => {
    navigate(`/university/${slugifiedUniversityName}`, {
      state: { university: university },
    });
  };

  const averageRating =
    university.reviews?.reduce((sum, review) => sum + review.rating, 0) /
    university.reviews?.length;

  return (
    <>
      <div
        key={university._id}
        className="flex flex-col justify-between w-[90%] lg:w-[45%] xl:w-[30%] h-[450px] mx-auto border-2 border-slate-100 p-6 my-6 rounded-md shadow-sm transition-all delay-50 ease-in-out cursor-pointer hover:scale-105"
        onClick={universityClickHandler}
      >
        <div>
          <img
            className="{university.name === 'Gandaki University' || university.name === 'Pokhara University' ?w-full : w-24} h-24 my-4"
            src={logoUri}
            alt="uni logo"
          />
          <h1 className="text-2xl text-slate-700 font-semibold my-4">
            {university.name || <Skeleton />}
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            {getFirstCharactersUptoN(university.description, 150) || (
              <Skeleton count={5} />
            )}
          </p>
          <span className="text-slate-400 text-sm">See More</span>
        </div>

        <div className="flex justify-between items-center my-4">
          {university.reviews?.length > 0 ? (
            <div className="w-16 h-16 rounded-full text-white bg-slate-800 flex justify-center items-center">
              <p>{averageRating} &#9733;</p>
            </div>
          ) : (
            <div></div>
          )}

          <div className="text-sm font-medium text-slate-600">
            {university.reviews?.length} reviews
          </div>
        </div>
      </div>
    </>
  );
};

export default University;
