import { Box, Button, Flex, GridItem, Heading, Stack } from "@chakra-ui/react";
import ListWrapper from "../../layouts/ListWrapper";
import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";
import { getURLID } from "../../../utils/URLUtils";
import UserWorkoutCard from "./UserWorkoutCard";

interface IUserSplitViewModel {
  description: string;
  idsplit: string;
  iduser: string;
  rating: number;
  splitName: string;
  workouts: IUserWorkout[];
}

export interface IUserWorkout {
  workoutId: string;
  workoutName: string;
}

const ViewUserSplit = () => {
  const [split, setSplits] = useState({} as IUserSplitViewModel);

  useEffect(() => {
    const getSplits = async () => {
      const id = getURLID(window.location.href);
      const { data } = await axios({
        method: "get",
        url: "https://localhost:7132/UserSplit/GetSplit?id=" + id,
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setSplits(data);
    };
    getSplits();
  }, []);

  return (
    <Flex m={{ md: 5, base: 2 }} flexDir={"column"}>
      <Box
        style={{
          justifyContent: "space-around",
          display: "flex",
          width: "100%",
        }}
      >
        <Flex flexDir={"column"}>
          <Heading>{split.splitName}</Heading>
          <Heading fontSize={"md"}>{split.description}</Heading>
        </Flex>
        <Flex justifyContent={"flex-end"} flexDir={"column"}>
          <Flex>
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                id={`${i}`}
                ml={1}
                color="black"
                fontSize={"4xl"}
              />
            ))}
          </Flex>

          <Button mt="2" size="sm">
            Rate this split
          </Button>
        </Flex>
      </Box>

      <Box
        style={{
          justifyContent: "space-around",
          display: "flex",
          width: "100%",
        }}
      >
        <Flex flexDir={"column"}>
          {split.workouts &&
            split.workouts.map((workout: IUserWorkout) => {
              return (
                <UserWorkoutCard
                  key={workout.workoutId}
                  workout={workout}
                ></UserWorkoutCard>
              );
            })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ViewUserSplit;
