// Router
import { Route, Routes } from "react-router-dom";

// Pages
import About from "./About";
import Home from "./Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Router;
