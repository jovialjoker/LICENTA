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
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../../utils/authorizationHeaders";
import useColors from "./useColors";
import { url } from "../../../env";

interface ExerciseItem {
  value: string;
  label: string;
}
interface ExerciseInitialState {
  exerciseId: string;
  name: string;
  description: string;
  selectedType: {
    value: string;
    label: string;
  };
  exerciseTypes: [];
  muscleGroups: [];
  selectedMuscleGroups: ExerciseItem[];
  image?: File;
}

const exerciseInitialState: ExerciseInitialState = {
  exerciseId: "00000000-0000-0000-0000-000000000000",
  name: " ",
  description: "",
  exerciseTypes: [],
  selectedType: {
    value: "",
    label: "",
  },
  muscleGroups: [],
  selectedMuscleGroups: [],
  image: undefined,
};

export default function InsertExercise() {
  const colors = useColors();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(exerciseInitialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params?.get("id");

    const getExercise = async () => {
      const { data } = await axios({
        method: "get",
        url: `${url}Exercises/getExerciseForInsert?id=${
          id ?? "00000000-0000-0000-0000-000000000000"
        }`,
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setExercise(data);
    };

    getExercise();
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    let formData = new FormData();

    let querryString = `?selectedType.value=${
      exercise.selectedType?.value || ""
    }&selectedType.label=${exercise.selectedType?.label || ""}`;

    formData.append("exerciseId", exercise.exerciseId);
    formData.append("name", exercise.name);
    formData.append("description", exercise.description);
    formData.append(
      "selectedType",
      new Blob([JSON.stringify(exercise.selectedType)])
    );
    let index = 0;
    for (let mg of exercise.selectedMuscleGroups) {
      formData.append("selectedMuscleGroups", new Blob([JSON.stringify(mg)]));
      querryString += `&selectedMuscleGroups[${index}].value=${mg.value}`;
      querryString += `&selectedMuscleGroups[${index}].label=${mg.label}`;
      index++;
    }
    if (exercise.image) {
      formData.append("image", exercise.image);
    }

    try {
      await axios({
        method: "post",
        url: `${url}Exercises/insertExercise${querryString}`,
        data: formData,
        headers: {
          Authorization: AuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/exercises");
    } catch (err: any) {
      const { data } = err.response;
      setError(data.title);
    }
  };

  useEffect(() => {
    setError(null);
  }, [exercise]);

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
          Insert Exercise
        </Heading>
        {error && <Text color="red.600">{error}</Text>}
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
            placeholder="name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={exercise.description}
            onChange={(e) =>
              setExercise({ ...exercise, description: e.target.value })
            }
            placeholder="description"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <FormControl color="black" isRequired>
          <FormLabel>Exercise Types</FormLabel>
          <Select
            value={exercise.selectedType}
            onChange={(e) => setExercise({ ...exercise, selectedType: e! })}
            options={exercise.exerciseTypes}
          />
        </FormControl>
        <FormControl color="black" isRequired>
          <FormLabel>Muscle groups</FormLabel>
          <Select
            value={exercise.selectedMuscleGroups}
            onChange={(e) => {
              setExercise({ ...exercise, selectedMuscleGroups: [...e] });
            }}
            isMulti
            options={exercise.muscleGroups}
          />
        </FormControl>
        <FormControl
          isRequired={
            exercise.exerciseId == "00000000-0000-0000-0000-000000000000"
          }
        >
          <FormLabel>Image</FormLabel>
          <Input
            onChange={(e) => {
              setExercise({
                ...exercise,
                image:
                  e.target.files && e.target.files.length > 0
                    ? e.target.files[0]
                    : undefined,
              });
            }}
            py={1}
            placeholder="description"
            _placeholder={{ color: "gray.500" }}
            type="file"
            accept="image/*"
          />
        </FormControl>
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
}
