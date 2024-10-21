import { combineReducers } from "redux";

import { bookTrip } from "./book/reducer";

export const reducers = combineReducers({
  bookTrip,
});
