import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IUserWorkout } from "./ViewUserSplit";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface IUserWorkoutCard {
  workout: IUserWorkout;
}
const UserWorkoutCard = ({ workout }: IUserWorkoutCard) => {
  const navigate = useNavigate();

  const viewHandler = (id: string) => {
    navigate(`/my-collection/view-exercise-progress/${id}`);
  };

  const addHandler = (id: string) => {
    navigate(`/my-collection/add-progress/${id}`);
  }

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      width={"60rem"}
      height={{ sm: "233px", md: "10rem" }}
      boxShadow={"2xl"}
      my={5}
    >
      <Flex
        borderTopRadius="3xl"
        height={"50%"}
        bgColor={"#393E46"}
        alignItems="center"
        justifyContent="center"
        color="#efefef"
      >
        <Heading fontSize={"2xl"}>{workout.workoutName}</Heading>
      </Flex>

      <Flex
        height={"50%"}
        alignItems="center"
        justifyContent="space-evenly"
        borderBottomRadius="3xl"
      >
        <Button size={"md"} bgColor={"lightPallette.primary.500"} onClick={() => addHandler(workout.workoutId)}>
          <Flex
            borderRadius={"full"}
            w="1.5rem"
            h="1.5rem"
            bgColor={"white"}
            mr="1rem"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <AddIcon />
          </Flex>
          <Box
            flex="1"
            textAlign="left"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Add progress
          </Box>
        </Button>
        <Button size={"md"} bgColor={"lightPallette.primary.500"} onClick={() => viewHandler(workout.workoutId)}>
          <Flex
            borderRadius={"full"}
            w="1.5rem"
            h="1.5rem"
            bgColor={"white"}
            mr="1rem"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Search2Icon />
          </Flex>
          <Box flex="1" textAlign="left" textOverflow="ellipsis">
            View exercise progress
          </Box>
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserWorkoutCard;
