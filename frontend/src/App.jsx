import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddUniversity from "./pages/AddUniversity.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addUniversity" element={<AddUniversity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
