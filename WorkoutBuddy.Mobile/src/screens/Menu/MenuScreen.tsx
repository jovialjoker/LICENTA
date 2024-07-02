import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Flex,
  Pressable,
  Heading,
  ChevronRightIcon,
  useDisclose,
  Modal,
  Button,
} from "native-base";
import React from "react";

export default function MenuScreen({ navigation }) {
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("unfinished");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("currentUser");
    onClose();
    navigation.navigate("Login", { refreshFlag: Date.now() });
  };

  return (
    <Flex safeArea mx={3} p={1}>
      <Heading>WorkoutBuddy</Heading>
      <Pressable
        borderWidth={"1px"}
        rounded={"md"}
        p={3}
        my={2}
        bgColor={"white"}
        _pressed={{ backgroundColor: "#FAF9F6" }}
        onPress={() => navigation.navigate("MyProfile")}
      >
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text>My profile</Text>
          <ChevronRightIcon />
        </Flex>
      </Pressable>
      <Pressable
        borderWidth={"1px"}
        rounded={"md"}
        p={3}
        my={2}
        bgColor={"white"}
        _pressed={{ backgroundColor: "#FAF9F6" }}
        onPress={onOpen}
      >
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text>Sign out</Text>
          <ChevronRightIcon />
        </Flex>
      </Pressable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header fontSize="4xl" fontWeight="bold">
            Sign out
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to log out? All unfinished workouts will be
            lost
          </Modal.Body>
          <Modal.Footer>
            <Button variant="unstyled" mr="1" onPress={onClose}>
              Cancel
            </Button>
            <Button colorScheme="error" onPress={handleSignOut}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  );
}
