import { api } from ".";

export const getAllCountries = async () => {
  try {
    const response = await api.get("all/");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCountryByName = async (name) => {
  try {
    const response = await api.get(`name/${name}`);

    return response.data[0];
  } catch (error) {
    throw error;
  }
};

export const getCountriesByCodes = async (codes) => {
  try {
    const response = await api.get(`alpha?codes=${codes.toString()}`);
    const names = response.data.map((country) => country.name.common);
    return names;
  } catch (error) {
    throw error;
  }
};
