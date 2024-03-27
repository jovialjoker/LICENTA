import {
  Flex,
  Heading,
  Divider,
  ChevronRightIcon,
  Text,
  Pressable,
} from "native-base";
import React from "react";
import {
  IUnfinishedExercise,
  IUnfinishedWorkout,
} from "../../../../interfaces/Split";
import { formatDate } from "../../../../utils/FormatUtils";

interface IUnfinishedWorkoutListItem {
  workout: IUnfinishedWorkout;
  navigation: any;
}

const UnfinishedWorkoutListItem = ({
  workout,
  navigation,
}: IUnfinishedWorkoutListItem) => {
  return (
    <Pressable
      maxW="96"
      onPress={() =>
        navigation.navigate("AddProgress", {
          workoutId: workout.workoutId,
          date: workout.date,
        })
      }
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
            <Flex alignItems={"center"}>
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
                <Text italic>Date: {formatDate(workout.date)}</Text>
                <Text>Recorded sets:</Text>
                <Flex p="2">
                  {workout.exercises.map((ex: IUnfinishedExercise) => (
                    <Flex flexDir={"row"} alignItems={"center"}>
                      <ChevronRightIcon color="#4E81D9" />
                      <Text>
                        {ex.name}: {ex.setsRecorded} sets
                      </Text>
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

export default UnfinishedWorkoutListItem;
