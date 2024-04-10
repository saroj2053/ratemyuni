import React from "react";
import logo from "../../assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = false;
  return (
    <header className="bg-white border-2 border-b-grey-light-2 font-grotesk w-full">
      <div className="max-w-[90%] mx-auto py-6 flex justify-between items-center">
        <div className="flex gap-1 items-center w-[30%]">
          <img
            src={logo}
            className="w-14 h-14 "
            alt="star within multiple circles"
          />
          <h1 className="text-2xl font-bold text-slate-700">Rate My Uni</h1>
        </div>

        <div className="relative w-[35%]">
          <form action="#">
            <input
              className="bg-grey-light-2 py-3 pl-8 pr-16 rounded-full w-full focus:outline-none font-grotesk"
              type="text"
              name="search_university"
              placeholder="Search university"
            />
            <button
              type="submit"
              className="absolute top-4 right-6 text-xl text-grey-dark-2 "
            >
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="w-1/5 flex justify-end">
          {user ? (
            <ul>
              <li className="cursor-pointer">
                <img
                  className="w-14 h-14"
                  src="https://avatar.iran.liara.run/username?username=Neha+Sanon"
                  alt=""
                />
              </li>
            </ul>
          ) : (
            <ul className="flex gap-8 justify-between items-center">
              <li
                className="text-base font-semibold py-2 px-4 rounded-full cursor-pointer bg-primary-dark text-white transition ease-in delay-100 hover:bg-default-primary hover:text-white"
                onClick={() => navigate("/login")}
              >
                Login/Signup
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
