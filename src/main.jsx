import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import NotFound from "./routes/404";
import Trending from "./routes/trending";
import News from "./routes/news";
import Comments from "./routes/comments";
import About from "./routes/about";
import Login from "./routes/login";
import Profile from "./routes/profile";
import Register from "./routes/register";
import Games from "./routes/games";
import Logout from "./routes/logout";
import "./index.css";
import { NotificationProvider } from "./core/notificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/news" element={<News />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={
            <NotificationProvider>
              <Login />
            </NotificationProvider>
          } />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:key" element={<Games />} />
          <Route element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
