import { Flex, ScrollView, Text, Button } from "native-base";
import React from "react";

const AddProgressScreen = ({ navigation, route }) => {
  return (
    <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
      {route.params?.workoutId}
      {route.params?.date}
    </Flex>
  );
};

export default AddProgressScreen;
