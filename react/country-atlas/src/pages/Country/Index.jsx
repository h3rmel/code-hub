import { useEffect, useState } from "react";

import { MainLayout } from "@/layouts/Main/Index";

import { CountryInfo, LoaderIf } from "@/components/Index";

import { Button, Flex, Image, useToast } from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";

import { getSpecificCountryByName } from "@/api/countries";

import { ArrowLeft } from "phosphor-react";

import { flexSx, imgSx } from "./style";

export const Country = () => {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  const { name } = useParams();
  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    returnCountry();
  }, []);

  const returnCountry = async () => {
    try {
      const response = await getSpecificCountryByName(name);
      setCountry(response);
      setLoading(false);
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

  const handleReturn = () => navigate("/", { replace: true });

  return (
    <MainLayout pageTitle={name}>
      <LoaderIf condition={loading}>
        <Button onClick={handleReturn}>
          <ArrowLeft size={20} /> Voltar
        </Button>
        <Flex sx={flexSx}>
          <Image
            src={country?.flags?.svg}
            alt={country?.flags?.alt}
            sx={imgSx}
          />
          <CountryInfo country={country} />
        </Flex>
      </LoaderIf>
    </MainLayout>
  );
};
