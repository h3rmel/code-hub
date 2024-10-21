import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { errors } from "@/config/errors.json";

const signInUser = async (auth, user) => {
  if (user.email === "" || user.password === "") throw "Preencha os campos!";

  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    throw handleErrorCode(error.code);
  }
};

const signUpUser = async (auth, user) => {
  if (user.email === "" || user.password === "") throw "Preencha os campos!";

  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    throw handleErrorCode(error.code);
  }
};

const handleErrorCode = (e) => {
  const message = errors.find((error) => error.code === e);
  return message.meaning;
};

export { signInUser, signUpUser };

