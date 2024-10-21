import { api } from ".";

export const getStocks = async () => {
  try {
    const response = await api.get("stocks");

    return response.data;
  } catch (error) {
    throw error;
  }
};
