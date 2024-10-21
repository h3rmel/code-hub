import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import { signUpUser } from "@/services/auth/sign";

import { auth } from "@/services/firebase";

import { toast } from "react-toastify";

import * as formCss from "@modules/form.module.css";
import * as layoutCss from "@modules/layout.module.css";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      signUpUser(auth, user);
      navigate("/admin", { replace: true });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <MainLayout pageTitle="Registrar-se">
      <hgroup className={layoutCss.headings}>
        <h1>Registre-se</h1>
        <h3>Vamos criar sua conta!</h3>
      </hgroup>
      <form className={formCss.form} onSubmit={handleSignUp}>
        <input
          type="email"
          className={formCss.input}
          placeholder="Digite seu e-mail..."
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          autoComplete="false"
          type="password"
          className={formCss.input}
          placeholder="Digite sua senha..."
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <div className={layoutCss.btns}>
          <button className={formCss.btn} type="submit">
            Criar conta
          </button>
          <Link to="/" className={layoutCss.link}>
            Já possui conta? É só logar
          </Link>
        </div>
      </form>
    </MainLayout>
  );
};
