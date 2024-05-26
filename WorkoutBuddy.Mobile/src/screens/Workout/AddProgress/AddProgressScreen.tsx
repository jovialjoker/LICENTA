import { Flex, ScrollView, Text, Button, Heading } from "native-base";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../../utils/SetAuthHeader";
import axios from "axios";
import env from "../../../utils/constants/env";
import { endpoints } from "../../../utils/constants/endpoints";
import {
  IUserExerciseModel,
  IUserExerciseSet,
  IUserWorkoutModel,
} from "../../../interfaces/Split";
import ExerciseCard from "./components/ExerciseCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddProgressScreen = ({ navigation, route }) => {
  const [workoutModel, setWorkoutModel] = useState({} as IUserWorkoutModel);

  useEffect(() => {
    const getValues = async () => {
      if (route.params.date) {
        let unfinishedWorkouts =
          (await AsyncStorage.getItem("unfinished")) ?? "[]";

        let workoutsArr = JSON.parse(unfinishedWorkouts);
        let workout = workoutsArr.find(
          (w: IUserWorkoutModel) =>
            w.workoutId == route.params.workoutId && w.date == route.params.date
        );
        setWorkoutModel(workout);
      } else {
        let authHeader = await AuthHeader();
        const { data } = await axios({
          method: "get",
          url: `${env.NGROK_URL}/${endpoints.UserSplit.GetUnfinishedProgressForWorkout}?workoutId=${route.params?.workoutId}&date=${route.params?.date}`,
          headers: {
            Authorization: authHeader,
          },
        });
        setWorkoutModel(data);
      }
    };
    getValues();
  }, []);

  const changeHandler = (exercise: IUserExerciseModel) => {
    const index = workoutModel.exercises.findIndex(
      (e) => e.exerciseId === exercise.exerciseId
    );
    let newWorkout = workoutModel;
    newWorkout.exercises[index] = exercise;
    setWorkoutModel(newWorkout);
  };

  const finishLaterHandler = async () => {
    let formatedWorkout: IUserWorkoutModel = {
      ...workoutModel,
      exercises: [],
    };
    for (let ex of workoutModel.exercises) {
      let formatedEx = {
        ...ex,
        sets:
          ex.sets && ex.sets.length > 0
            ? ex.sets.map(
                (set) =>
                  ({
                    distance: set.distance,
                    duration: set.duration,
                    weight: set.weight,
                    reps: set.reps,
                  } as IUserExerciseSet)
              )
            : [],
      };
      formatedWorkout.exercises.push(formatedEx);
    }

    try {
      let unfinishedWorkouts =
        (await AsyncStorage.getItem("unfinished")) ?? "[]";
      let workouts = JSON.parse(unfinishedWorkouts);
      workouts = workouts.filter(
        (w: IUserWorkoutModel) =>
          w.workoutId != formatedWorkout.workoutId &&
          w.date != formatedWorkout.date
      );
      await AsyncStorage.setItem(
        "unfinished",
        JSON.stringify([...workouts, formatedWorkout])
      );

      navigation.navigate("Home", {
        refreshFlag: formatedWorkout.date.toString(),
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
      <Flex h="90%">
        <ScrollView>
          {workoutModel.exercises &&
            workoutModel?.exercises.length > 0 &&
            workoutModel.exercises.map((ex: IUserExerciseModel) => (
              <ExerciseCard
                key={ex.exerciseId}
                exercise={ex}
                changeHandler={changeHandler}
              />
            ))}
        </ScrollView>
      </Flex>
      <Flex flexDir={"row"} justifyContent={"space-evenly"}>
        <Button
          w="40%"
          bgColor={"#DCA950"}
          _pressed={{ bgColor: "#eacb96" }}
          onPress={finishLaterHandler}
        >
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
