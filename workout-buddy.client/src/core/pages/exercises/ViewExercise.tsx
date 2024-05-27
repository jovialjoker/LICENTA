import React, { useEffect, useState } from "react";
import { getURLID } from "../../../utils/URLUtils";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import AuthHeader from "../../../utils/authorizationHeaders";
import useColors from "./useColors";
import BackButton from "../../components/BackButton";

export default function ViewExercise() {
  const colors = useColors();
  const [exercise, setExercises] = useState<any>({ muscleGroups: [] });
  useEffect(() => {
    const id = getURLID(window.location.href);
    const getExercise = async (id: string) => {
      const { data } = await axios({
        method: "get",
        url: `https://localhost:7132/Exercises/view?id=${id}`,
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setExercises(data);
    };

    if (id) {
      getExercise(id);
    }
  }, []);
  return (
    <Container maxW={"7xl"}>
      <BackButton />
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 2, md: 8 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`https://localhost:7132/Image/getImageById?id=${exercise.idImage}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {exercise.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {exercise.exerciseType}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {exercise.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={colors.accentColor}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Muscles Targeted
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  {exercise.muscleGroups.map((mg: any, index: number) => {
                    return <ListItem key={index}>{mg}</ListItem>;
                  })}
                </List>
              </SimpleGrid>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
