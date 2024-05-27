import React, { useEffect, useState } from "react";
import { ExerciseTypes } from "./ExerciseTypes";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IProgressSet } from "./AddProgress";

interface IUserExerciseComponent {
  exerciseType: number;
  index: number;
  changeHandler: (set: IProgressSet, index: number) => void;
  set: any;
}

const UserSetComponent = ({
  exerciseType,
  index,
  changeHandler,
  set,
}: IUserExerciseComponent) => {
  const setChangeHandler = (value: number, property: string) => {
    let newSet = { ...set, [property]: value };
    changeHandler(newSet, index);
  };

  switch (exerciseType) {
    case ExerciseTypes.Cardio:
      return (
        <Flex bgColor={"white"} p={3} flexDir={"column"} rounded={"lg"}>
          <FormControl isRequired>
            <FormLabel>Duration</FormLabel>
            <Input
              color={"black"}
              value={set.duration}
              id="set"
              onChange={(e: any) =>
                setChangeHandler(e.target.value, "duration")
              }
              placeholder="no of sets"
              _placeholder={{ color: "gray.500" }}
              bg={"white"}
              type="number"
            />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel>Distance</FormLabel>
            <Input
              color={"black"}
              value={set.distance}
              id="set"
              onChange={(e: any) =>
                setChangeHandler(e.target.value, "distance")
              }
              placeholder="no of sets"
              _placeholder={{ color: "gray.500" }}
              bg={"white"}
              type="number"
            />
          </FormControl>
        </Flex>
      );
    case ExerciseTypes.WeightLifting:
      return (
        <Flex bgColor={"white"} p={3} flexDir={"column"} rounded={"lg"}>
          <FormControl isRequired>
            <FormLabel>Reps</FormLabel>
            <Input
              color={"black"}
              value={set.reps}
              id="set"
              onChange={(e: any) => setChangeHandler(e.target.value, "reps")}
              placeholder="no of sets"
              _placeholder={{ color: "gray.500" }}
              bg={"white"}
              type="number"
            />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel>Weight</FormLabel>
            <Input
              color={"black"}
              value={set.weight}
              id="set"
              onChange={(e: any) => setChangeHandler(e.target.value, "weight")}
              placeholder="no of sets"
              _placeholder={{ color: "gray.500" }}
              bg={"white"}
              type="number"
            />
          </FormControl>
        </Flex>
      );
    case ExerciseTypes.Calisthenics:
      return (
        <Flex bgColor={"white"} p={3} flexDir={"column"} rounded={"lg"}>
          <FormControl isRequired>
            <FormLabel>Reps</FormLabel>
            <Input
              color={"black"}
              value={set.reps}
              id="set"
              onChange={(e: any) => setChangeHandler(e.target.value, "reps")}
              placeholder="no of sets"
              _placeholder={{ color: "gray.500" }}
              bg={"white"}
              type="number"
            />
          </FormControl>
        </Flex>
      );
    default:
      return <></>;
  }
};

export default UserSetComponent;
