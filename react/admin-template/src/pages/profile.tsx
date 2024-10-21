//#region Imports

import { MainLayout } from "@/layouts/Index";

import {
  Card,
  CardHeader,
  Heading,
  Avatar,
  Flex,
  CardBody,
  Divider,
  Text,
  Badge,
} from "@chakra-ui/react";

import { initFirebase } from "@/firebase/firebaseApp";

import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

//#endregion

export default function Profile() {
  initFirebase();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <MainLayout title="Perfil">
      <Card maxW="md">
        <CardHeader>
          <Flex gap={4} alignItems="center">
            <Avatar
              size="xl"
              name={user?.displayName !== null ? user?.displayName : "John Doe"}
              src={
                user?.photoURL !== null
                  ? user?.photoURL
                  : "./avatar-placeholder.png"
              }
            />
            <Heading>{user?.displayName}</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="lg" gap={4}>
            <strong>E-mail:</strong>{" "}
            {user?.email}
          </Text>
          <Text fontSize="lg">
            <strong>Número de Celular:</strong>{" "}
            {user?.phoneNumber !== null ? user?.phoneNumber : "N/A"}
          </Text>
        </CardBody>
      </Card>
    </MainLayout>
  );
}
