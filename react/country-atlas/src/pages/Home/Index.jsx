import { useEffect, useState } from "react";

import { CountryForm, CountryGrid, LoaderIf } from "@/components/Index";

import { MainLayout } from "@/layouts/Main/Index";

import { useToast } from "@chakra-ui/react";

import { getAllCountries } from "@/api/countries";

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const toast = useToast();

  useEffect(() => {
    returnAllCountries();
  }, []);
1
  const returnAllCountries = async () => {
    try {
      const response = await getAllCountries();

      setCountries(response), setFilteredCountries(response);
    } catch (error) {
      toast({
        title: "Erro",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MainLayout pageTitle="Home">
      <LoaderIf condition={countries.length === 0}>
        <CountryForm countries={countries} setFilter={setFilteredCountries} />
        <CountryGrid countries={filteredCountries} />
      </LoaderIf>
    </MainLayout>
  );
};
