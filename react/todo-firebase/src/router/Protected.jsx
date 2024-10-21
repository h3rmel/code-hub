import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { saveUserData } from "@/services/auth/userData";

import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { toast } from "react-toastify";

const Protected = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = () => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) userAuthIsTrue(user);
        else userAuthIsFalse();
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const userAuthIsTrue = (user) => {
    saveUserData(user);
    setLoading(false);
    setSignIn(true);
  };

  const userAuthIsFalse = () => {
    setLoading(false);
    setSignIn(false);
  };

  if (loading) return "Carregando...";

  if (!signIn) return <Navigate to="/" />;

  return children;
};

export default Protected;
