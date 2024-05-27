import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";
import { ISplit } from "./InsertSpit";
import AuthHeader from "../../../utils/authorizationHeaders";

interface IWorkoutProps {
  index: number;
  musclesGroups: [];
  split: ISplit;
  setSplit: React.Dispatch<React.SetStateAction<ISplit>>;
}

const Workout = (props: IWorkoutProps) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let queryString = "?";
      let indexOfMuscles = 0;

      for (let elem of props.split.workouts[props.index].selectedMuscleGroups) {
        queryString = `${queryString}[${indexOfMuscles}]=${elem.value}&`;
        indexOfMuscles++;
      }
      const { data } = await axios({
        method: "get",
        url: `https://localhost:7132/Exercises/getExercisesByMuscleGroups${queryString}`,
        headers: {
          Authorization: AuthHeader(),
        },
      });

      setExercises(data);
    };
    getData();
  }, [props.split.workouts[props.index].selectedMuscleGroups]);

  const muscleGroupsChangeHandler = async (e: any) => {
    const workouts = props.split.workouts;

    workouts[props.index] = {
      ...props.split.workouts[props.index],
      selectedMuscleGroups: e,
    };

    props.setSplit({ ...props.split, workouts });
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      [e.target.id]: e.target.value,
    };
    props.setSplit({ ...props.split, workouts });
  };

  const changeExercisesHandler = (e: any) => {
    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      exercises: e as { value: string; label: string }[],
    };
    props.setSplit({ ...props.split, workouts });
  };

  const deleteWorkout = () => {
    const workouts = props.split.workouts;
    workouts[props.index] = {
      ...props.split.workouts[props.index],
      isDeleted: true,
    };
    props.setSplit({ ...props.split, workouts });
  };
  console.log(props.split);

  return (
    <Stack
      spacing={4}
      w={"full"}
      bg={useColorModeValue("white", "darkPallette.accent.500")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
      my={2}
    >
      <Box display="flex" justifyContent="space-between">
        <Heading lineHeight={1.1} fontSize={{ base: "lg", sm: "md" }}>
          New workout
        </Heading>
        <a>
          <CloseIcon color="red" onClick={deleteWorkout} />
        </a>
      </Box>

      <FormControl isRequired>
        <FormLabel> Workout Name</FormLabel>
        <Input
          color={"black"}
          value={props.split.workouts[props.index].workoutName}
          id="workoutName"
          onChange={changeNameHandler}
          placeholder="name"
          _placeholder={{ color: "gray.500" }}
          bg={"white"}
          type="text"
        />
      </FormControl>

      <FormControl color="black" isRequired>
        <FormLabel>Muscle groups</FormLabel>
        <Select
          value={props.split.workouts[props.index].selectedMuscleGroups}
          id="selectedMuscleGroups"
          onChange={muscleGroupsChangeHandler}
          isMulti
          options={props.split.musclesGroups}
        />
      </FormControl>
      <FormControl color="black" isRequired>
        <FormLabel>Exercises</FormLabel>
        <Select
          value={props.split.workouts[props.index].exercises}
          id="exercises"
          onChange={changeExercisesHandler}
          isMulti
          options={exercises}
        />
      </FormControl>
    </Stack>
  );
};

export default Workout;
