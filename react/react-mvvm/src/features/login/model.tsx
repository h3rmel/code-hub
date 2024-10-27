import { ChangeEvent, FormEvent, useState } from "react";

export function useLoginModel() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(`Email: ${email}, Senha: ${password}`);
  }

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleSubmit,
  };
}
