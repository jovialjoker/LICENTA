import {
  Button,
  Heading,
  Box,
  Grid,
  GridItem,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
} from "@chakra-ui/react";
import axios from "axios";
import {
  Fragment,
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../../utils/authorizationHeaders";
import Exercise from "./Exercise";
import ListWrapper from "../../layouts/ListWrapper";
import { SmallAddIcon } from "@chakra-ui/icons";
import SplitsSearchFilters from "../splits/SplitsSearchFilters";
import useColors from "./useColors";

const ExercisesList = () => {
  const colors = useColors();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState<
    { value: number; label: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const deferredSearchParams = useDeferredValue(searchParams);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get("http://localhost:8082/Exercises/get", {
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setExercises(data);
    };
    getExercises();
  }, []);

  useEffect(() => {
    const getMuscleGroups = async () => {
      const { data } = await axios.get(
        "http://localhost:8082/api/MuscleGroups",
        {
          headers: {
            Authorization: AuthHeader(),
          },
        }
      );
      setMuscleGroups(data);
    };
    getMuscleGroups();
  }, []);

  const addHandler = () => {
    navigate("/exercises/insert-exercise");
  };
  const deleteHandler = (exerciseId: number) => {
    const newExercises = exercises.filter(
      (ex: any) => ex.exerciseId != exerciseId
    );
    setExercises(newExercises);
  };

  const handleSelectGroup = (e: any) => {
    setSelectedGroups(e);
  };

  const handleSubmitSearch = (input: string) => {
    setLoading(true);
    const url = new URL("http://localhost:8082/Exercises/get");
    for (let group of selectedGroups) {
      url.searchParams.append("muscleGroup", group.value.toString());
    }
    url.searchParams.append("search", input);
    console.log(url);
    const getFilteredExercises = async () => {
      const { data } = await axios.get(url.toString(), {
        headers: {
          Authorization: AuthHeader(),
        },
      });

      setExercises(data);
      setLoading(false);
    };

    getFilteredExercises();
  };

  return (
    <Fragment>
      <ListWrapper>
        <GridItem colSpan={{ base: 2, lg: 3 }}>
          <Box
            style={{
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Heading>Exercises</Heading>
          </Box>

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
                <Exercise
                  isStale={searchParams !== deferredSearchParams}
                  key={ex.exerciseId}
                  exercise={ex}
                  deleteHandler={deleteHandler}
                ></Exercise>
              );
            })}
          </Grid>
        </GridItem>
        <GridItem
          colSpan={{ base: 2, lg: 1 }}
          display="flex"
          flexDirection="column"
          h={"100%"}
          position="relative"
        >
          <Box position="sticky" top={0}>
            <Button
              marginTop={"68px"}
              colorScheme={colors.primaryScheme}
              variant="outline"
              onClick={addHandler}
              width={"100%"}
            >
              <SmallAddIcon mr={1} h={6} />
              Add new exercise
            </Button>

            <SplitsSearchFilters
              searchParams={deferredSearchParams}
              setSearchParams={setSearchParams}
              selectedOptions={selectedGroups}
              handleSelectGroup={handleSelectGroup}
              isRangeEnabled={false}
              data={muscleGroups.map((ex: any) => ({
                value: ex.idgroup + 1,
                label: ex.name,
              }))}
              selectPlaceholder="Select exercise type"
              inputPlaceholder="Search by name"
              handleSubmitSearch={handleSubmitSearch}
            />
          </Box>
        </GridItem>
      </ListWrapper>
      {loading && (
        <Modal isCentered isOpen={loading} onClose={onClose}>
          <ModalOverlay
            bg="rgba(0,0,0,0.2)"
            backdropInvert="80%"
            backdropBlur="2px"
          />
          <ModalContent textAlign="center" bg="none" boxShadow={0}>
            <Spinner mx="auto" height="100px" width="100px" />
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  );
};

export default ExercisesList;
