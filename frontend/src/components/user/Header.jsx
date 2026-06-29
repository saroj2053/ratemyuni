import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useUserContext from "../../context/UserContext";
import useLogout from "../../hooks/useLogout";
import useSearchUniversity from "../../hooks/useSearchUniversity";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserContext();
  const { loading, logout } = useLogout();
  const { searchUniversity } = useSearchUniversity();

  const handleSearch = async (evt) => {
    evt.preventDefault();
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-9 h-9" alt="Rate My Uni" />
          <h1 className="text-lg font-bold text-gray-800 hidden sm:block">
            Rate My Uni
          </h1>
        </div>

        {shouldRenderSearchForm && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <input
                className="w-full bg-gray-100 py-2 pl-4 pr-12 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                type="text"
                value={searchTerm}
                onChange={(evt) => setSearchTerm(evt.target.value)}
                placeholder="Search university"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaSearch size={14} />
              </button>
            </div>
          </form>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-600 hidden md:block">
                {user.fullName}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-sm font-medium text-white bg-gray-800 px-4 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
