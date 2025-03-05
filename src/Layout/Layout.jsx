import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <NavBar />
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;