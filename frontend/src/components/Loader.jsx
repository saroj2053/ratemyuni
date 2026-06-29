import React from "react";

const Loader = ({ title }) => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-500">
        Loading {title}...
      </p>
    </div>
  );
};

export default Loader;
