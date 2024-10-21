import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Heading,
  List,
  ListItem,
  Stack,
  Tooltip
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { Buildings, GlobeHemisphereEast, UsersThree } from "phosphor-react";

import {
  cardHeaderSx,
  cardStackSx,
  cardSx,
  headingSx,
  listItemSx
} from "./style";

export const CountryItem = ({ country }) => {
  return (
    <GridItem>
      <Link to={`/country/${country.name.common}`}>
        <Card sx={cardSx}>
          <CardHeader backgroundImage={country.flags.svg} sx={cardHeaderSx} />
          <CardBody p={0}>
            <Stack sx={cardStackSx}>
              <Heading size="md" sx={headingSx}>
                {country.name.common}
              </Heading>
              <List spacing={2}>
                <ListItem sx={listItemSx}>
                  <Tooltip label="População" placement="top">
                    <Badge>
                      <UsersThree size={20} />
                    </Badge>
                  </Tooltip>
                  {country.population.toLocaleString("pt-BR")}
                </ListItem>
                <ListItem sx={listItemSx}>
                  <Tooltip label="Região" placement="top">
                    <Badge>
                      <GlobeHemisphereEast size={20} />
                    </Badge>
                  </Tooltip>
                  {country.region}
                </ListItem>
                <ListItem sx={listItemSx}>
                  <Tooltip label="Capital" placement="top">
                    <Badge>
                      <Buildings size={20} />
                    </Badge>
                  </Tooltip>
                  {country.capital}
                </ListItem>
              </List>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </GridItem>
  );
};
