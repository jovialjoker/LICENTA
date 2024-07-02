import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useColors from "../splits/colors";
import { ISplitViewModel } from "./UserSplitsList";

interface IUserSplitCard {
  split: ISplitViewModel;
}
export default function UserSplitCard(props: IUserSplitCard) {
  const colors = useColors();
  const navigate = useNavigate();

  const viewHandler = (id: string) => {
    navigate(`/my-collection/view-split/${id}`);
  };

  // const deleteHandler = async (id: string) => {
  //   let res = confirm("Are you sure you want to delete this split?");
  //   if (res) {
  //     try {
  //       await axios({
  //         method: "post",
  //         url: `${url}Splits/delete`,
  //         data: id,
  //         //   headers: {
  //         //     "Content-Type": "application/json",
  //         //     Authorization: AuthHeader(),
  //         //   },
  //       });
  //       // deleteExercises(exerciseId);
  //     } catch (err) {}
  //   }
  // };

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius={{ sm: "3xl" }}
        width={"100%"}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={colors.cardColor}
        boxShadow={"2xl"}
        spacing={8}
      >
        <Flex
          flex={1}
          borderLeftRadius={{ md: "3xl", base: "none" }}
          bgColor={"#393E46"}
          alignItems="center"
          justifyContent="center"
          color="#efefef"
        >
          <Heading>{props.split.name}</Heading>
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={4}
          pt={2}
        >
          <Text textAlign={"center"} color={colors.descriptionText} px={3}>
            <b>Description: </b>
            {props.split.description}
          </Text>
          <Text textAlign={"center"} color={colors.descriptionText} px={3}>
            <b>Workouts number: </b>
            {props.split.workoutsNo}
          </Text>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              onClick={() => viewHandler(props.split.splitId)}
            >
              View
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"red.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(220 20 60 / 48%), 0 10px 10px -5px rgb(220 20 60 / 43%)"
              }
              _hover={{
                bg: "red.500",
              }}
              _focus={{
                bg: "red.500",
              }}
              //   onClick={(e) => deleteHandler(exercise.exerciseId)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
