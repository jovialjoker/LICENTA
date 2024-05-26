import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../../utils/SetAuthHeader";
import axios from "axios";
import { endpoints } from "../../../utils/constants/endpoints";
import env from "../../../utils/constants/env";
import {
  IUnfinishedWorkout,
  IUserExerciseModel,
  IUserWorkoutModel,
} from "../../../interfaces/Split";
import UnfinishedWorkoutListItem from "./components/UnfinishedWorkoutListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseActionScreen = ({ navigation, route }) => {
  const [unfinishedWorkouts, setUnfinishedWorkouts] = useState<
    IUnfinishedWorkout[]
  >([]);

  useEffect(() => {
    const getValues = async () => {
      let unfinishedWorkouts =
        (await AsyncStorage.getItem("unfinished")) ?? "[]";
      setUnfinishedWorkouts(JSON.parse(unfinishedWorkouts));
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
            {unfinishedWorkouts.map((workout: IUserWorkoutModel) => (
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
