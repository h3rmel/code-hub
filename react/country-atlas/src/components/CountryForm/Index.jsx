import { useEffect, useState } from "react";

import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select
} from "@chakra-ui/react";

import { MagnifyingGlass } from "phosphor-react";

import { regions } from "@/constants/regions.json";

import { flexSx } from "./style";

import { filterCountries } from "@/services/filterCountries";

export const CountryForm = ({ countries, setFilter }) => {
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    region: "",
  });

  useEffect(() => {
    setFilter(filterCountries(countries, searchQuery));
  }, [searchQuery]);

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const updatedSearchQuery = {
      ...searchQuery,
      [name]: value,
    };

    setSearchQuery(updatedSearchQuery);
  };

  return (
    <Flex sx={flexSx}>
      <InputGroup size="lg" flexBasis={{ base: "60%", md: "75%" }}>
        <InputLeftElement>
          <MagnifyingGlass size={24} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Pesquise por algum país..."
          name="name"
          value={searchQuery.name}
          onChange={(e) => handleSearchQuery(e)}
        />
      </InputGroup>
      <Select
        name="region"
        size="lg"
        value={searchQuery.region}
        flexBasis={{ base: "40%", md: "25%" }}
        onChange={(e) => handleSearchQuery(e)}
      >
        <option value="">Filtrar por região</option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
