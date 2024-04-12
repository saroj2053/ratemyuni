import React from "react";
import logo from "../../assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../context/UserContext";
import useLogout from "../../hooks/useLogout";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { loading, logout } = useLogout();
  return (
    <header className="bg-white border-2 border-b-grey-light-2 font-grotesk w-full">
      <div className="max-w-[90%] mx-auto py-6 flex justify-between items-center">
        <div className="flex gap-1 items-center w-[40%] md:w-[30%]">
          <img
            src={logo}
            className="w-14 h-14 "
            alt="star within multiple circles"
          />
          <h1 className="text-2xl font-bold text-slate-700">Rate My Uni</h1>
        </div>

        <div className="relative w-[30%] hidden lg:block">
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

        <div className="w-[30%] flex justify-end">
          {user ? (
            <ul className="flex gap-10 justify-between items-center">
              <li className="cursor-pointer">
                <img className="w-14 h-14" src={user.profileAvatar} alt="" />
              </li>
              <li
                className="text-base font-semibold py-2 px-4 rounded-md cursor-pointer border-2 border-primary-dark text-grey-dark-1 transition ease-in delay-100 hover:bg-primary-dark hover:text-white"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          ) : (
            <ul className="flex gap-10 justify-between items-center">
              <li
                className="text-base font-semibold text-grey-dark-1 cursor-pointer hover:text-primary-dark"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
              <li
                className="text-base font-semibold py-2 px-4 rounded-md cursor-pointer border-2 border-primary-dark text-grey-dark-1 transition ease-in delay-100 hover:bg-primary-dark hover:text-white"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
