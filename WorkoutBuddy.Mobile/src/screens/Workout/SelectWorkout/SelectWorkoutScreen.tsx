import { Button, Flex, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../../utils/SetAuthHeader";
import axios from "axios";
import env from "../../../utils/constants/env";
import { endpoints } from "../../../utils/constants/endpoints";
import { ISplitListItem, IWorkout } from "../../../interfaces/Split";
import WorkoutListItem from "./components/WorkoutListItem";

const SelectWorkoutScreen = ({navigation}) => {
  const [workoutsList, setWorkoutsList] = useState<IWorkout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");

  useEffect(() => {
    const getUserSplits = async () => {
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoints.UserSplit.GetWorkoutsForProgress}`,
        headers: {
          Authorization: authHeader,
        },
      });
      setWorkoutsList(data);
    };
    getUserSplits();
  }, []);

  return (
    <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
      <Flex h="93%">
        <ScrollView flexGrow={1}>
          {workoutsList &&
            workoutsList.length > 0 &&
            workoutsList.map((workout: IWorkout) => (
              <WorkoutListItem
                workout={workout}
                selectHandler={setSelectedWorkout}
                selectedWorkout={selectedWorkout}
              />
            ))}
        </ScrollView>
      </Flex>
      <Button bgColor={"#4E81D9"} borderRadius={"full"} onPress={() => navigation.navigate("AddProgress", {workoutId: selectedWorkout})}>
        Continue
      </Button>
    </Flex>
  );
};

export default SelectWorkoutScreen;
