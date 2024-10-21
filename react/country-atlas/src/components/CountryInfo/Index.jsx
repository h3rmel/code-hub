import { useEffect, useState } from "react";

import {
  Button,
  Code,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  useToast,
  Wrap,
  WrapItem
} from "@chakra-ui/react";

import { getCountriesByCodes } from "@/api/countries";

import { stackSx } from "./style";

export const CountryInfo = ({ country }) => {
  const [borderCountries, setBorderCountries] = useState([]);

  const toast = useToast();

  useEffect(() => {
    returnBorderCountries();
  }, []);

  const returnBorderCountries = async () => {
    if (country.borders === undefined) return;

    try {
      const response = await getCountriesByCodes(country.borders);

      setBorderCountries(response);
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
    <Stack sx={stackSx} spacing={{ base: 4, md: 8 }}>
      <Heading size="lg">{country?.name?.common}</Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 32 }}
      >
        <List spacing={4}>
          <ListItem>
            <Text as="strong">Nome nativo:</Text>{" "}
            {Object.values(country.name.nativeName)[0].common}
          </ListItem>
          <ListItem>
            <Text as="strong">População:</Text>{" "}
            {country?.population?.toLocaleString("pt-BR")}
          </ListItem>
          <ListItem>
            <Text as="strong">Região:</Text> {country?.region}
          </ListItem>
          <ListItem>
            <Text as="strong">Sub-região:</Text> {country?.subregion}
          </ListItem>
        </List>
        <List spacing={4}>
          <ListItem>
            <Text as="strong">Capital:</Text>{" "}
            {country?.capital.map((capital) => capital)}
          </ListItem>
          <ListItem>
            <Text as="strong">Top Level Domain:</Text>{" "}
            <Code>{country?.tld.map((tld) => tld)}</Code>
          </ListItem>
          <ListItem>
            <Text as="strong">Moedas:</Text>{" "}
            {Object.values(country.currencies).map((currency, index) => {
              if (index === Object.values(country.currencies).length - 1)
                return `${currency.name} (${currency.symbol})`;
              else return `${currency.name} (${currency.symbol}), `;
            })}
          </ListItem>
          <ListItem>
            <Text as="strong">Idiomas:</Text>{" "}
            {Object.values(country.languages).map((language, index) => {
              if (index === Object.values(country.languages).length - 1)
                return language;
              else return `${language}, `;
            })}
          </ListItem>
        </List>
      </Stack>
      {borderCountries.length > 0 && (
        <Stack>
          <Text as="strong">Países de borda:</Text>
          <Wrap>
            {borderCountries.map((borderCountry, index) => (
              <WrapItem key={index}>
                <Link href={`/country/${borderCountry}`} isExternal>
                  <Button variant="outline" size="sm">
                    {borderCountry}
                  </Button>
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      )}
    </Stack>
  );
};
