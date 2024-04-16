import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../admin/Sidebar";

const AppLayout = ({ children, onSearch }) => {
  return (
    <div>
      <Header onSearch={onSearch} />
      <div>
        <main className="min-h-[100vh]">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
