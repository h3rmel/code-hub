export const addBookTrip = (trip) => {
  return {
    type: "ADD_BOOKTRIP",
    trip,
  };
};

export const removeBookTrip = (id) => {
  return {
    type: "REMOVE_BOOKTRIP",
    id,
  };
};

export const updateAmount = (id, amount) => {
  return {
    type: "UPDATE_BOOKTRIP",
    id,
    amount,
  };
};
