import { Flex, ScrollView, Text, Button, Heading } from "native-base";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../../utils/SetAuthHeader";
import axios from "axios";
import env from "../../../utils/constants/env";
import { endpoints } from "../../../utils/constants/endpoints";
import {
  IUserExerciseModel,
  IUserWorkoutModel,
} from "../../../interfaces/Split";

const AddProgressScreen = ({ navigation, route }) => {
  const [workoutModel, setWorkoutModel] = useState({} as IUserWorkoutModel);

  useEffect(() => {
    const getValues = async () => {
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoints.UserSplit.GetUnfinishedProgressForWorkout}?workoutId=${route.params?.workoutId}&date=${route.params?.date}`,
        headers: {
          Authorization: authHeader,
        },
      });
      console.log(data);
      setWorkoutModel(data);
    };
    getValues();
  }, []);

  return (
    <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
      <Flex h="90%">
        <ScrollView>
          {workoutModel.exercises &&
            workoutModel?.exercises.length > 0 &&
            workoutModel.exercises.map((ex: IUserExerciseModel) => (
              <Flex bgColor={"white"} p="5" my="5" borderRadius={"2xl"}>
                <Heading>{ex.exerciseName}</Heading>
              </Flex>
            ))}
        </ScrollView>
      </Flex>
      <Flex flexDir={"row"} justifyContent={"space-evenly"}>
        <Button w="40%" bgColor={"#DCA950"}>
          <Text>Finish later</Text>
        </Button>
        <Button w="40%" bgColor={"#4E81D9"}>
          End workout
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddProgressScreen;
