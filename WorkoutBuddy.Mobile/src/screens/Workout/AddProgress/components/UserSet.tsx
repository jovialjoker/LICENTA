import React, { useEffect, useState } from "react";
import { IFormSet, IUserExerciseSet } from "../../../../interfaces/Split";
import { Button, CloseIcon, Flex, FormControl, Input } from "native-base";
import { ExerciseTypes } from "../../../../enums/ExerciseTypes";

interface IUserExerciseComponent {
  exerciseType: number;
  index: number;
  changeHandler: (set: IFormSet, index: number) => void;
  set: any;
  removeHandler: (index: number) => void;
}

const UserSetComponent = ({
  exerciseType,
  index,
  changeHandler,
  set,
  removeHandler,
}: IUserExerciseComponent) => {
  const setChangeHandler = (value: number, property: string) => {
    let newSet = { ...set, [property]: value };
    changeHandler(newSet, index);
  };

  switch (exerciseType) {
    case ExerciseTypes.Cardio:
      return (
        <Flex bgColor="#F1F2EB" my={2} p={3} flexDir={"column"} rounded={"lg"}>
          <FormControl isRequired>
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormControl.Label>Duration</FormControl.Label>
              <Button variant={"ghost"} onPress={() => removeHandler(index)}>
                <CloseIcon color="#FF0000" m={1} />
              </Button>
            </Flex>
            <Input
              color={"black"}
              value={set.duration}
              id="set"
              onChangeText={(value: any) => setChangeHandler(value, "duration")}
              placeholder="duration of exercise"
              bg={"white"}
              keyboardType="numeric"
            />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormControl.Label>Distance</FormControl.Label>
            <Input
              color={"black"}
              value={set.distance}
              id="set"
              onChangeText={(value: any) => setChangeHandler(value, "distance")}
              placeholder="distance"
              bg={"white"}
              keyboardType="numeric"
            />
          </FormControl>
        </Flex>
      );
    case ExerciseTypes.WeightLifting:
      return (
        <Flex bgColor="#F1F2EB" my={2} p={3} flexDir={"column"} rounded={"lg"}>
          <FormControl isRequired>
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormControl.Label>Reps</FormControl.Label>
              <Button variant={"ghost"} onPress={() => removeHandler(index)}>
                <CloseIcon color="#FF0000" m={1} />
              </Button>
            </Flex>
            <Input
              color={"black"}
              value={set.reps}
              id="set"
              onChangeText={(value: any) => setChangeHandler(value, "reps")}
              placeholder="no of sets"
              bg={"white"}
              keyboardType="numeric"
            />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormControl.Label>Weight</FormControl.Label>
            <Input
              color={"black"}
              value={set.weight}
              id="set"
              onChangeText={(value: any) => setChangeHandler(value, "weight")}
              placeholder="weight lifted"
              bg={"white"}
              keyboardType="numeric"
            />
          </FormControl>
        </Flex>
      );
    case ExerciseTypes.Calisthenics:
      return (
        <Flex bgColor="#F1F2EB" my={2} p={3} flexDir={"column"} rounded={"lg"}>
          <FormControl isRequired>
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormControl.Label>Reps</FormControl.Label>
              <Button variant={"ghost"} onPress={() => removeHandler(index)}>
                <CloseIcon color="#FF0000" m={1} />
              </Button>
            </Flex>
            <Input
              color={"black"}
              value={set.reps}
              id="set"
              onChangeText={(value: any) => setChangeHandler(value, "reps")}
              placeholder="no of sets"
              bg={"white"}
              keyboardType="numeric"
            />
          </FormControl>
        </Flex>
      );
    default:
      return <></>;
  }
};

export default UserSetComponent;
