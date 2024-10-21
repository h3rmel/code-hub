import { ErrorLayout } from "@/layouts/Error/Index";

import { Card, CardBody, Code, Heading } from "@chakra-ui/react";

import { useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  return (
    <ErrorLayout pageTitle={error.message}>
      <Card borderWidth={2} borderColor="red">
        <CardBody textAlign="center">
          <Heading size="lg">Um erro ocorreu... 👀</Heading>
          <Code colorScheme="red" mt={4}>
            {error.message}
          </Code>
        </CardBody>
      </Card>
    </ErrorLayout>
  );
};
