import { FormEvent, useRef } from "react";

export function useLoginModel() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(
      `Email: ${emailRef.current?.value}, Senha: ${passwordRef.current?.value}`
    );
  }

  return {
    emailRef,
    passwordRef,
    handleSubmit,
  };
}
