// @refresh reload
import { Route, Router } from "@solidjs/router";
import "./app.css";
import Register from "./routes/register";
import Login from "./routes/login";
import About from "./routes/about";
import NotFound from "./routes/404";
import Home from "./routes/index";
export default function App() {
  return (
    <Router>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="*404" component={NotFound} />
    </Router>
  );
}
