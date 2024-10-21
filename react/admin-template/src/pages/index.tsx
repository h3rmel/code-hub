//# region Imports

import { MainLayout } from "@/layouts/Index";

import { Text } from "@chakra-ui/react";

//#endregion

export default function Home() {
  return (
    <MainLayout title="Home">
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
        voluptates doloremque quidem aliquam accusamus fuga minus eligendi nulla
        quam quaerat!
      </Text>
    </MainLayout>
  );
}
