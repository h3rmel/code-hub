import produce from "immer";

export function bookTrip(state = [], action) {
  if (action.type === "ADD_BOOKTRIP")
    return produce(state, (draft) => {
      const tripIndex = draft.findIndex((trip) => trip.id === action.trip.id);

      if (tripIndex >= 0) draft[tripIndex].amount += 1;
      else
        draft.push({
          ...action.trip,
          amount: 1,
        });
    });

  if (action.type === "REMOVE_BOOKTRIP")
    return produce(state, (draft) => {
      const tripIndex = draft.findIndex((trip) => trip.id === action.id);

      if (tripIndex >= 0) draft.splice(tripIndex, 1);
    });

  if (action.type === "UPDATE_BOOKTRIP" && action.amount > 0)
    return produce(state, (draft) => {
      const tripIndex = draft.findIndex((trip) => trip.id === action.id);

      if (tripIndex >= 0) draft[tripIndex].amount = Number(action.amount);
    });

  return state;
}
