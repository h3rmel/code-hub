import { ErrorLayout } from "@/layouts/Error/Index";

import { Card, CardBody, Code, Heading } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <ErrorLayout pageTitle="Página não encontrada">
      <Card borderWidth={2} borderColor="red">
        <CardBody textAlign="center">
          <Heading size="lg">Página não encontrada... 👀</Heading>
          <Code colorScheme="red" mt={4}>
            404 - Not Found
          </Code>
        </CardBody>
      </Card>
    </ErrorLayout>
  );
};
