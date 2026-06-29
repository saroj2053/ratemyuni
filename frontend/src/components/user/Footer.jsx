import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Rate My Uni</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-sm">
            Enabling transparency in the selection of universities as per the
            reviews from the students
          </p>
        </div>
        <p className="text-sm text-gray-400 shrink-0">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
