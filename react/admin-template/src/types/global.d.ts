import { SystemStyleObject } from "@chakra-ui/react";

import { User as FirebaseUser } from "firebase/auth";

export {};

declare global {
  //*
  //* Interfaces
  //*

  interface AuthModeToggleProps {
    mode: string;
    setMode: Dispatch<SetStateAction<Mode>>;
  }

  interface InputPasswordProps {
    value?: string;
    valueChange: (value: ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
  }

  interface ToggleColorModeProps {
    sx?: SystemStyleObject;
    size?: string;
  }

  interface MainLayoutProps {
    title: string;
    children?: React.ReactNode;
  }

  interface NavbarLayoutProps {
    sxStack?: SystemStyleObject;
    sxContainer?: SystemStyleObject;
    userInfo?: FirebaseUser | null;
  }

  //*
  //* Types
  //*

  type Mode = "login" | "register";

  type User = {
    email?: string;
    password?: string;
  };
}
