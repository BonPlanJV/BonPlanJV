import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import NotFound from "./routes/404";
import Home from "./routes/index";
import About from "./routes/about";
import Login from "./routes/login";
import Profile from "./routes/profile";
import Register from "./routes/register";
import Games from "./routes/games";
import Logout from "./routes/logout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games/*" element={<Games />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
