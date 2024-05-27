import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ListWrapper from "../../layouts/ListWrapper";
import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";
import { getURLID } from "../../../utils/URLUtils";
import UserWorkoutCard from "./UserWorkoutCard";
import { useNavigate } from "react-router-dom";
import ExerciseProgress from "./ExerciseProgress";
import { IProgressSet } from "./AddProgress";

export interface IExerciseDay {
  date: Date;
  setsNo: number;
  sets: IProgressSet[];
  exerciseCoef: number;
}

export interface IExerciseModel {
  workoutId: string;
  days: IExerciseDay[];
  exerciseName: string;
  maxSets: number;
}

const ViewExerciseProgress = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<IExerciseModel[]>([]);

  useEffect(() => {
    const getExercises = async () => {
      const id = getURLID(window.location.href);
      debugger;
      const { data } = await axios.get(
        "https://localhost:7132/UserSplit/GetExercisesProgress?id=" + id,
        {
          headers: {
            Authorization: AuthHeader(),
          },
        }
      );
      setExercises(data);
    };
    getExercises();
  }, []);

  return (
    <ListWrapper>
      <GridItem colSpan={3}>
        <Box
          style={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Heading textAlign={"center"}>
            Your exercises progress in this workout
          </Heading>
        </Box>
        <Flex flexDir={"column"}>
          {exercises.length > 0 && exercises[0].exerciseName != null ? (
            exercises.map((ex: any) => (
              <ExerciseProgress
                key={ex.exerciseName}
                exercise={ex}
              ></ExerciseProgress>
            ))
          ) : (
            <Flex
              height={"30vh"}
              width={"80vw"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading size="md">
                Unfortunatly there is no recorded progress for this workout
              </Heading>
            </Flex>
          )}
        </Flex>
      </GridItem>
    </ListWrapper>
  );
};

export default ViewExerciseProgress;
