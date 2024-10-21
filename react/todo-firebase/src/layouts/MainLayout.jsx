import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import * as layoutCss from "@modules/layout.module.css";

const MainLayout = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = `${pageTitle} | Todo Firebase`;
  });
  return (
    <div className={layoutCss.container}>
      {children}
      <ToastContainer autoClose={3000} theme="dark" />
    </div>
  );
};

export default MainLayout;
