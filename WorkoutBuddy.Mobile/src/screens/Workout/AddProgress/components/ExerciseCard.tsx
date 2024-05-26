import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  Divider,
  Flex,
  Heading,
  Pressable,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  IFormSet,
  IUserExerciseModel,
  IUserExerciseSet,
} from "../../../../interfaces/Split";
import UserSetComponent from "./UserSet";
import { generateGUID } from "../../../../utils/GenerateGuid";

interface IExerciseCard {
  exercise: IUserExerciseModel;
  changeHandler: Function;
}

const setsInitialState = {
  id: "",
  reps: null,
  weight: null,
  duration: null,
  distance: null,
};

const ExerciseCard = ({ exercise, changeHandler }: IExerciseCard) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [sets, setSets] = useState<IFormSet[]>([]);

  useEffect(() => {
    if (exercise.sets && exercise.sets.length > 0) {
      setSets(exercise.sets);
      console.log("here");
    }
  }, [exercise.sets]);

  const newSetHandler = () => {
    const newSets = [...sets, { ...setsInitialState, id: generateGUID() }];
    setSets(newSets);
    changeHandler({ ...exercise, sets: newSets });
  };

  const setChangeHandler = (set: IFormSet, index: number) => {
    const newSets = sets.map((s, i) => (i === index ? set : s));
    setSets(newSets);
    changeHandler({ ...exercise, sets: newSets });
  };

  const removeSetHandler = (index: number) => {
    const newSets = sets.filter((s, i) => i !== index);
    console.log(newSets);
    setSets([...newSets]);

    changeHandler({ ...exercise, sets: newSets });
  };

  return (
    <Pressable
      bgColor={"white"}
      p="5"
      my="5"
      borderRadius={"2xl"}
      onPress={() => {
        setIsShown((sh) => !sh);
      }}
      _pressed={{ backgroundColor: "#FAF9F6" }}
    >
      <Flex
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading>{exercise.exerciseName}</Heading>
        {isShown ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Flex>

      <Flex display={isShown ? "block" : "none"}>
        <Divider my={2}></Divider>
        {sets &&
          sets.length > 0 &&
          sets.map((set, index) => {
            return (
              <UserSetComponent
                key={set.id}
                set={set}
                exerciseType={exercise.exerciseType}
                index={index}
                changeHandler={setChangeHandler}
                removeHandler={removeSetHandler}
              />
            );
          })}
        <Button
          width={"30%"}
          alignSelf={"center"}
          mt={3}
          rounded="3xl"
          variant={"outline"}
          onPress={newSetHandler}
        >
          <Text color={"#4E81D9"}>New set</Text>
        </Button>
      </Flex>
    </Pressable>
  );
};

export default ExerciseCard;
