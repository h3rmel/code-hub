export const filterCountries = (countries, searchQuery) => {
  const filteredCountries = countries.filter((country) => {
    if (
      !country.region.toLowerCase().includes(searchQuery.region.toLowerCase())
    )
      return;

    if (
      !country.name.common
        .toLowerCase()
        .includes(searchQuery.name.toLowerCase())
    )
      return;

    return country;
  });

  return filteredCountries;
};
