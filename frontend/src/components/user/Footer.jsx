import React from "react";

const Footer = () => {
  return (
    <div className=" fixed bottom-0 left-0 w-full font-grotesk border-2 border-t-grey-light-2">
      <div className="max-w-[90%] h-16 mx-auto flex justify-between items-center">
        <div>Copyright &copy; All rights reserved.</div>
        <div>Rate My Uni</div>
        <div>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
