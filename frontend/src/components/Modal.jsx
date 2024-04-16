import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="flex justify-center items-center w-[50%] mx-auto fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-50 rounded-md shadow-md">
      <div className="bg-slate-300 p-8 rounded shadow-sm w-full relative">
        <span
          className="text-slate-600 text-2xl font-semibold px-2 rounded-full cursor-pointer hover:text-black hover:bg-white absolute right-5"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
