import React from "react";

const Footer = () => {
  return (
    <div className="w-full font-grotesk border-2 border-t-grey-light-2 py-5">
      <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row lg:items-center justify-between items-start py-5 ">
        <div className="lg:w-[33%]">
          <h1 className="text-4xl font-semibold text-slate-700 my-2">
            Rate My Uni
          </h1>
          <p className="text-slate-500 text-base">
            Unlocking Insights, Shaping Futures: Your Voice, Your University
            Journey!
          </p>
        </div>
        <div>
          <p className="text-center py-4 text-slate-500 text-sm">
            Copyright &copy; All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
