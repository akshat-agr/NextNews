import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import CustomizeAvatar from "./pages/CustomizeAvatar"; // Import new page
import AnchorPage from "./pages/AnchorPage";

export default function App() {
  return (
    <Router>
      <div className="bg-[#1A1A1A] min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<HomePage />} />
          <Route path="/demo/anchor" element={<AnchorPage/>} />
          <Route path="/demo/anchor/customize" element={<CustomizeAvatar />} />
        </Routes>
      </div>
    </Router>
  );
}
