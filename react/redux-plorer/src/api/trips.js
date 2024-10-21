import { api } from ".";

export const getTrips = async () => {
  try {
    const response = await api.get("trips");

    return response.data;
  } catch (error) {
    throw error;
  }
};
