import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-grey-light-4 flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-dark">
        404 - Not Found
      </h1>
      <p className="text-sm sm:text-md md:text-lg text-slate-700">
        The page you are requesting for doesn't exist...
      </p>

      <button
        type="button"
        className=" border-2 border-slate-600 px-6 py-2 rounded-md  text-slate-600 hover:bg-slate-700 hover:text-white"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
