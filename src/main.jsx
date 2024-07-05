import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import NotFound from "./routes/404";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";
import Register from "./routes/register";
import Games from "./routes/games";
import Logout from "./routes/logout";
import CreateDeal from "./routes/create-deal";
import "./index.css";
import { NotificationProvider } from "./core/notificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <NotificationProvider>
              <Home />
            </NotificationProvider>
          }
        />
        <Route
          path="/news"
          element={
            <NotificationProvider>
              <Home sort={1} />
            </NotificationProvider>
          }
        />
        <Route
          path="/comments"
          element={
            <NotificationProvider>
              <Home sort={2} />
            </NotificationProvider>
          }
        />
        <Route
          path="/favorites"
          element={
            <NotificationProvider>
              <Home getFavorites={true} />
            </NotificationProvider>
          }
        />
        <Route
          path="/create-deal"
          element={
            <NotificationProvider>
              <CreateDeal />
            </NotificationProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <NotificationProvider>
              <Profile />
            </NotificationProvider>
          }
        />
        <Route
          path="/login"
          element={
            <NotificationProvider>
              <Login />
            </NotificationProvider>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/register"
          element={
            <NotificationProvider>
              <Register />
            </NotificationProvider>
          }
        />
        <Route
          path="/games/:key"
          element={
            <NotificationProvider>
              <Games />
            </NotificationProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
