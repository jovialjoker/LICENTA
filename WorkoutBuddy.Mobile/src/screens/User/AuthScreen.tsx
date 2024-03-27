import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
  Text,
  Flex,
  IconButton,
  CloseIcon,
} from "native-base";
import React, { useState } from "react";
import DumbellSvg from "../../svgComponents/DumbellSvg";
import IAuthObject from "./interfaces/IAuthObject";
import env from "../../utils/constants/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertComponent from "./components/AlertComponent";
import { endpoints } from "../../utils/constants/endpoints";

const AuthScreen = ({ navigation, route }) => {
  const [authObject, setAuthObject] = useState({} as IAuthObject);
  const [isSuccessful, setIsSuccesfull] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState([] as string[]);

  const submitHandler = async () => {
    const res = await fetch(`${env.NGROK_URL}/${endpoints.User.Login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authObject),
    });

    const data = await res.json();

    if (data.status != 401 && data.status != 400) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: data.username,
          userId: data.userId,
        })
      );

      setIsSuccesfull(true);
      setShowAlert(true);
      navigation.navigate("HomeStack");
    } else if (data.errors) {
      setErrors([...Object.values(data.errors)]);
      setIsSuccesfull(false);
      setShowAlert(true);
    } else {
      setIsSuccesfull(false);
      setShowAlert(true);
      setErrors(["This email/password combination doesn't exist"]);
    }
  };

  const changeHandler = (key: string, value: string) => {
    setShowAlert(false);
    setAuthObject({ ...authObject, [key]: value });
  };

  return (
    <Center w="100%" h="100%" bgColor={"#F1F2EB"}>
      <Box safeArea w="90%" maxW="290">
        <VStack space={3} mb={10}>
          <Flex w="100%" alignItems={"center"}>
            <Flex
              borderColor={"black"}
              borderWidth={1}
              borderRadius={"55"}
              width={110}
              height={110}
              alignItems={"center"}
              justifyContent={"center"}
              bgColor={"#4A4A48"}
            >
              <DumbellSvg />
            </Flex>
          </Flex>
          <Flex>
            <Heading fontFamily={"mono"} size={"2xl"} textAlign={"center"}>
              Workout Buddy
            </Heading>
          </Flex>
        </VStack>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={authObject.email}
              onChangeText={(text: string) => changeHandler("email", text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={authObject.password}
              onChangeText={(text: string) => changeHandler("password", text)}
            />
          </FormControl>
          <Button mt="2" bgColor="#A4C2A5" onPress={submitHandler}>
            Sign in
          </Button>
        </VStack>
      </Box>
      {showAlert &&
        (isSuccessful ? (
          <AlertComponent
            isSuccessful={isSuccessful}
            alertHandler={setShowAlert}
            text={"Login successful"}
          />
        ) : (
          errors.map((error, index) => (
            <AlertComponent
              isSuccessful={isSuccessful}
              alertHandler={setShowAlert}
              key={index}
              text={error}
            />
          ))
        ))}
    </Center>
  );
};

export default AuthScreen;
