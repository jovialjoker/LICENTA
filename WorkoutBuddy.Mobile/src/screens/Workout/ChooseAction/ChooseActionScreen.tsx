import { Button, Center, Divider, Flex, Heading, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../../utils/SetAuthHeader";
import axios from "axios";
import { endpoints } from "../../../utils/constants/endpoints";
import env from "../../../utils/constants/env";
import { IUnfinishedWorkout } from "../../../interfaces/Split";
import UnfinishedWorkoutListItem from "./components/UnfinishedWorkoutListItem";

const ChooseActionScreen = ({ navigation, route }) => {
  const [unfinishedWorkouts, setUnfinishedWorkouts] = useState<
    IUnfinishedWorkout[]
  >([]);

  useEffect(() => {
    const getValues = async () => {
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoints.UserSplit.GetUnfinishedWorkouts}`,
        headers: {
          Authorization: authHeader,
        },
      });
      setUnfinishedWorkouts(data);
    };
    getValues();
  }, []);

  return (
    <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
      <Flex mb="5" alignItems={"center"}>
        <Button
          w="80%"
          bgColor={"#DCA950"}
          onPress={() => navigation.navigate("SelectWorkout")}
        >
          Start a new workout
        </Button>
      </Flex>
      <Divider></Divider>
      <Flex h="70%" mt="5">
        <Heading>Your unfinished workouts:</Heading>
        {unfinishedWorkouts && unfinishedWorkouts.length > 0 ? (
          <ScrollView>
            {unfinishedWorkouts.map((workout: IUnfinishedWorkout) => (
              <UnfinishedWorkoutListItem
                workout={workout}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        ) : (
          <Center h="100%">
            <Heading size={"sm"}>You dont have any unfinished workouts</Heading>
          </Center>
        )}
      </Flex>
    </Flex>
  );
};

export default ChooseActionScreen;
