import React from "react";

const Loader = ({ title }) => {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 justify-center items-center">
      <img
        className="w-20 h-20 animate-spin"
        src="https://www.svgrepo.com/show/173880/loading-arrows.svg"
        alt="Loading icon"
      ></img>
      <h2 className="text-xl font-semibold text-slate-700">Loading {title}</h2>
    </div>
  );
};

export default Loader;
