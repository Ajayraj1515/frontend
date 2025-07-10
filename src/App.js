import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalProvider from "./context/GlobalProvider"; // ✅ Import GlobalProvider

function App() {
  return (
    <Router>
      <GlobalProvider> {/* ✅ Wrap the entire app */}
        <ToastContainer position="bottom-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
