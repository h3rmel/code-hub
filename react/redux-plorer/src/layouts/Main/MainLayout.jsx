import { useEffect } from "react";

import { Header } from "@components/Index";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const MainLayout = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = `${pageTitle} | ReduXplorer`;
  }, []);

  return (
    <>
      <Header />
      {children}
      <ToastContainer autoClose={3000} theme="dark" />
    </>
  );
};
