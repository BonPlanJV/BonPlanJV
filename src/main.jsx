import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import NotFound from "./routes/404";
import Home from "./routes/index";
import About from "./routes/about";
import Login from "./routes/login";
import Register from "./routes/register";
import Games from "./routes/games";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games/*" element={<Games />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
