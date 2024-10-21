import { firebaseErrors } from "@/constants/errors.json";

const handleErrorCode = (e: string) => {
  const message = firebaseErrors.find((error: any) => error.code === e);
  return message?.meaning;
};

export { handleErrorCode };
