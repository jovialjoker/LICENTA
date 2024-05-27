import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Divider,
  Flex,
  Heading,
  Pressable,
  Spacer,
  Text,
} from "native-base";
import React from "react";
import { IExercise, IWorkout } from "../../../../interfaces/Split";

interface IWorkoutListItem {
  workout: IWorkout;
  selectedWorkout: string;
  selectHandler: Function;
}

const WorkoutListItem = ({
  workout,
  selectedWorkout,
  selectHandler,
}: IWorkoutListItem) => {
  return (
    <Pressable
      maxW="96"
      onPress={() => selectHandler(workout.workoutId)}
      key={workout.workoutId}
    >
      {({
        isHovered,
        isFocused,
        isPressed,
      }: {
        isHovered: boolean;
        isFocused: boolean;
        isPressed: boolean;
      }) => {
        return (
          <Flex
            marginX={"auto"}
            width={"90%"}
            my="5"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <Flex
              alignItems={"center"}
              {...(workout.workoutId == selectedWorkout
                ? {
                    borderColor: "#4E81D9",
                    borderWidth: "4",
                    borderRadius: "30",
                  }
                : {})}
            >
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                bgColor={"#DCA950"}
                w={"100%"}
                borderTopRadius={"3xl"}
                p="3"
              >
                <Heading>{workout.name}</Heading>
              </Flex>
              <Divider></Divider>
              <Flex
                justifyContent={"center"}
                bgColor={"white"}
                w={"100%"}
                borderBottomRadius={"3xl"}
                p="3"
              >
                <Text>Exercises included:</Text>
                <Flex p="2">
                  {workout.exercises.map((ex: IExercise) => (
                    <Flex flexDir={"row"} alignItems={"center"}>
                      <ChevronRightIcon color="#4E81D9" />
                      <Text>{ex.name}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      }}
    </Pressable>
  );
};

export default WorkoutListItem;
