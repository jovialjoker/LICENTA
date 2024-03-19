import { IProgressExercises, IProgressSet } from "./AddProgress";
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
import UserSetComponent from "./UserSetComponent";

interface IUserExerciseComponent {
  exercise: IProgressExercises;
  changeHandler: (exercise: IProgressExercises) => any;
}

const setsInitialState = {
  reps: null,
  weight: null,
  duration: null,
  distance: null,
};

const UserExerciseComponent = ({
  exercise,
  changeHandler,
}: IUserExerciseComponent) => {
  const [setsNo, setSetsNo] = useState<string | undefined>();
  const [sets, setSets] = useState<IProgressSet[]>([]);
  const [rerender, setRerender] = useState(1)

  const setsNoChangeHandler = (value: string) => {
    let newSets = [];
    for (let i in Array.from(Array(parseInt(value)).keys())) {
      newSets.push(setsInitialState);
    }
    setSets(newSets);
    setSetsNo(value);
    changeHandler({...exercise, sets: newSets})
  };

  const setChangeHandler = (set: IProgressSet, index: number) => {
    const newSets = sets;
    newSets[index] = set;
    setSets(newSets);
    setRerender(rerender + 1)
  };

  return (
    <Stack
      spacing={4}
      w={"full"}
      bg={"rgba(0, 0, 0, 0.1)"}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
      my={2}
    >
      <Box display="flex" justifyContent="space-between">
        <Heading lineHeight={1.1} fontSize={{ base: "lg", sm: "md" }}>
          {exercise.exerciseName}
        </Heading>
      </Box>

      <FormControl isRequired>
        <FormLabel>Number of sets</FormLabel>
        <Input
          color={"black"}
          value={setsNo}
          id="set"
          onChange={(e: any) => setsNoChangeHandler(e.target.value)}
          placeholder="no of sets"
          _placeholder={{ color: "gray.500" }}
          bg={"white"}
          type="number"
        />
      </FormControl>

      {rerender && sets &&
        sets.map((set, i) => {
          return (
            <UserSetComponent
              key={i}
              index={i}
              exerciseType={exercise.exerciseType}
              changeHandler={setChangeHandler}
              set={set}
            ></UserSetComponent>
          );
        })}
    </Stack>
  );
};

export default UserExerciseComponent;
