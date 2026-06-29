import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6 px-4">
      <h1 className="text-6xl sm:text-7xl font-bold text-gray-300">404</h1>
      <p className="text-lg text-gray-500 text-center">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
