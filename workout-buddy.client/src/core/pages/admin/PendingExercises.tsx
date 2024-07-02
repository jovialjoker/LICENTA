import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "../../components/ExerciseCard";
import ListWrapper from "../../layouts/ListWrapper";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { url } from "../../../env";

function PendingExercises() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roles = sessionStorage.getItem("roles");
    if (!roles?.includes("Admin")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const result = await axios.get(`${url}Admin/getPendingExercises`, {
          headers: {
            Authorization: AuthHeader(),
          },
        });
        const data = result.data;
        setExercises(data);
      } catch (error: any) {}
    };
    getExercises();
  }, []);
  console.log("here");
  return (
    <>
      <ListWrapper>
        <GridItem colSpan={{ base: 2, lg: 3 }}>
          <Box
            style={{
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Heading>Pending exercises</Heading>
          </Box>
          {exercises.length > 0 ? (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {exercises.map((ex: any) => {
                return (
                  <ExerciseCard
                    key={ex.exerciseId}
                    exercise={ex}
                  ></ExerciseCard>
                );
              })}
            </Grid>
          ) : (
            <Flex
              height={"30vh"}
              width={"80vw"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading size="md">There is no pending exercise</Heading>
            </Flex>
          )}
        </GridItem>
      </ListWrapper>
    </>
  );
}

export default PendingExercises;
