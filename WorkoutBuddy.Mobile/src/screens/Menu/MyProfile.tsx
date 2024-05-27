import { Flex, FormControl, Text } from "native-base";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../utils/SetAuthHeader";
import axios from "axios";
import { endpoints } from "../../utils/constants/endpoints";
import env from "../../utils/constants/env";
import { formatDate } from "../../utils/FormatUtils";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    birthDate: "",
    roles: [],
    currentWeight: 0,
  });
  useEffect(() => {
    const getUserSplits = async () => {
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoints.User.UserInfo}`,
        headers: {
          Authorization: authHeader,
        },
      });
      setUser(data);
    };
    getUserSplits();
  }, []);

  return (
    <Flex mx={3} p={3}>
      <FormControl mb={3}>
        <FormControl.Label>Name</FormControl.Label>
        <Text bold fontSize={"lg"} ml={2}>
          {user.name}
        </Text>
      </FormControl>
      <FormControl mb={3}>
        <FormControl.Label>Username</FormControl.Label>
        <Text bold fontSize={"lg"} ml={2}>
          {user.username}
        </Text>
      </FormControl>
      <FormControl mb={3}>
        <FormControl.Label>Email</FormControl.Label>
        <Text bold fontSize={"lg"} ml={2}>
          {user.email}
        </Text>
      </FormControl>
      <FormControl mb={3}>
        <FormControl.Label>Birth date</FormControl.Label>
        <Text bold fontSize={"lg"} ml={2}>
          {formatDate(user.birthDate)}
        </Text>
      </FormControl>
      <FormControl mb={3}>
        <FormControl.Label>Roles</FormControl.Label>
        <Text bold fontSize={"lg"} ml={2}>
          {user.roles.join(", ")}
        </Text>
      </FormControl>
      <FormControl mb={3}>
        <FormControl.Label>Current weight</FormControl.Label>
        <Text bold fontSize={"lg"} ml={2}>
          {user.currentWeight} kgs
        </Text>
      </FormControl>
    </Flex>
  );
};

export default MyProfile;
