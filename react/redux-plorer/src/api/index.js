import axios from "axios";

export const api = axios.create({
  baseURL: "https://6420eed925cb6572105165c9.mockapi.io/reduXplorer/api/",
  timeout: 5000,
});
