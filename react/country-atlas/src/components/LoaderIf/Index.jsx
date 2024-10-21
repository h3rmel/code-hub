import { Center, Spinner } from "@chakra-ui/react";

export const LoaderIf = ({ condition, children }) => {
  return (
    <>
      {condition ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        children
      )}
    </>
  );
};
