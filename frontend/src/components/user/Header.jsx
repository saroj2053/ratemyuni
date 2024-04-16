import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useUserContext from "../../context/UserContext";
import useLogout from "../../hooks/useLogout";
import useSearchUniversity from "../../hooks/useSearchUniversity";
import Home from "../../pages/Home";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserContext();
  const { loading, logout } = useLogout();
  const { searchUniversity } = useSearchUniversity();

  const handleSearch = async (evt) => {
    evt.preventDefault();

    //removing unnecessary characters from query string
    const newSearchTerm = searchTerm.replace(/[+\-*/%^]/g, "");
    if (newSearchTerm.length > 0) {
      const data = await searchUniversity(newSearchTerm);
      onSearch(data, newSearchTerm);
    } else {
      onSearch([], "");
    }
  };

  const shouldRenderSearchForm = location.pathname === "/";
  return (
    <header className="bg-white border-2 border-b-grey-light-2 font-grotesk w-full">
      <div className="max-w-[90%] mx-auto py-6 flex flex-wrap justify-between items-center">
        <div className="flex gap-1 items-center w-[40%] md:w-[30%]">
          <img
            src={logo}
            className="w-14 h-14 "
            alt="star within multiple circles"
          />
          <h1 className="text-lg font-bold text-slate-700">Rate My Uni</h1>
        </div>

        {shouldRenderSearchForm && (
          <div className="relative w-[30%] hidden lg:block">
            <form onSubmit={handleSearch}>
              <input
                className="bg-grey-light-2 py-3 pl-8 pr-16 rounded-full w-full focus:outline-none font-grotesk"
                type="text"
                value={searchTerm}
                onChange={(evt) => setSearchTerm(evt.target.value)}
                name="search_university"
                placeholder="Search university"
              />
              <button
                type="submit"
                className="absolute top-4 right-6 text-xl text-grey-dark-2"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}

        <div className="w-[50%] md:w-[30%] flex justify-end">
          {user ? (
            <ul className="flex gap-10 justify-between items-center">
              <li className="cursor-pointer">
                <img className="w-14 h-14" src={user.profileAvatar} alt="" />
              </li>
              <li
                className="text-base font-semibold py-2 px-4 rounded-md cursor-pointer border-2  text-grey-dark-1 transition ease-in delay-100 hover:bg-slate-600 hover:text-white"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          ) : (
            <ul className="flex gap-10 justify-between items-center">
              <li
                className="text-base font-semibold  cursor-pointer border-2 px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-500 text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
              <li
                className="text-base font-semibold py-2 px-4 rounded-md cursor-pointer border-2 border-slate-700 text-grey-dark-1 transition ease-in delay-100 hover:bg-slate-700 hover:text-white"
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
