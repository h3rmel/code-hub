import { SimpleGrid } from "@chakra-ui/react";

import { CountryItem } from "../CountryItem/Index";

export const CountryGrid = ({ countries }) => {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
        xl: 3,
        "2xl": 4,
      }}
      gap={6}
    >
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </SimpleGrid>
  );
};
