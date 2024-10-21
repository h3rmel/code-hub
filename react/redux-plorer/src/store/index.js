import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "./modules/root";

export const store = configureStore({ reducer: reducers });
