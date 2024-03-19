import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../../utils/authorizationHeaders";
import { getURLID } from "../../../utils/URLUtils";
import UserExerciseComponent from "./UserExerciseComponent";
import useColors from "../splits/colors";

export interface IProgressSet{
    reps: number | null;
    weight: number| null;
    duration: number| null;
    distance: number| null;
}

export interface IProgressExercises {
  exerciseId: string;
  exerciseName: string;
  exerciseType: number;
  sets: IProgressSet[];
  setsNo: number;
}

interface IProgress {
  userId: string;
  date: string;
  splitId: string;
  workoutId: string;
  exercises: IProgressExercises[];
}

const workoutInitialState: IProgress = {
  userId: "",
  date: "",
  splitId: "",
  workoutId: "",
  exercises: [],
};

const AddProgress = () => {
  const [progressModel, setProgressModel] = useState(workoutInitialState);
  const colors = useColors()
  const navigate = useNavigate();

  useEffect(() => {
    const id = getURLID(window.location.href);

    const getExercise = async () => {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:8082/UserSplit/AddProgress?id=${id}`,
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setProgressModel(data);
    };

    getExercise();
  }, []);

  const changeHandler = (exercise: IProgressExercises) => {
    const index = progressModel.exercises.findIndex(e => e.exerciseId === exercise.exerciseId)
    progressModel.exercises[index] = exercise
    setProgressModel(progressModel)
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    await axios({
        method: "post",
        url: `http://localhost:8082/UserSplit/AddProgress`,
        data: progressModel,
        headers: {
          Authorization: AuthHeader(),
        },
      });

    navigate("/exercises");
  }

  return (
    <Flex
      mt={20}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={2}
      >
        <Heading lineHeight={1.1} mb={2} fontSize={{ base: "2xl", sm: "3xl" }}>
          Add progress
        </Heading>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="datetime-local"
            value={progressModel.date}
            onChange={(e) =>
              setProgressModel({
                ...progressModel,
                date: e.target.value,
              })
            }
            placeholder="name"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        {progressModel.exercises.map((e) => (
          <UserExerciseComponent
            key={e.exerciseId}
            exercise={e}
            changeHandler={changeHandler}
          ></UserExerciseComponent>
        ))}
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            colorScheme={colors.primaryScheme}
            color={"black"}
            w="full"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default AddProgress;
