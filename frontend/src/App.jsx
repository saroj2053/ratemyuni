import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddUniversity from "./pages/AddUniversity.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserContext from "./context/UserContext.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import UniversityDetails from "./pages/UniversityDetails.jsx";
import SearchedUniversity from "./pages/SearchedUniversity.jsx";

function App() {
  const { user } = useUserContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/addUniversity" element={<AddUniversity />} />
          <Route
            path="/university/:name"
            exact
            element={<UniversityDetails />}
          />
          <Route path="/search" element={<SearchedUniversity />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
