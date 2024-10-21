//#region Imports

import { useRouteError } from "react-router-dom";

import { ErrorLayout } from "@/layouts/Index";

//#endregion

export const Error = () => {
  const error = useRouteError();

  return <ErrorLayout pageTitle="Um erro aconteceu!" message={error.message} />;
};
