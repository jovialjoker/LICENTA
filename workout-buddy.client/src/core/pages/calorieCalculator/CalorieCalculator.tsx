import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Slider,
  Stack,
  Heading,
  Input,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";
import { url } from "../../../env";

interface IObjective {
  type: string;
  rate: number;
}

const SOMATIC_TYPES: OptionsOrGroups<string, any> | undefined = [
  {
    value: "0",
    label: "Ectomorf",
  },
  {
    value: "1",
    label: "Mezomorf",
  },
  {
    value: "2",
    label: "Endomorf",
  },
];
const GENDER: OptionsOrGroups<string, any> | undefined = [
  {
    value: "0",
    label: "Male",
  },
  {
    value: "1",
    label: "Female",
  },
];
const OBJECTIVE: OptionsOrGroups<string, any> | undefined = [
  {
    value: "0",
    label: "Weight loss",
  },
  {
    value: "1",
    label: "Maintaining",
  },
  {
    value: "2",
    label: "Weight gain",
  },
];

const CaloriesCalculator = () => {
  const [gender, setGender] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const [somaticType, setSomaticType] = useState<string | undefined>();
  const [objective, setObjective] = useState<IObjective>({
    type: "1",
    rate: 0,
  });
  const [activity, setActivity] = useState<number | undefined>();
  const [isTraining, setIsTraining] = useState<boolean>();
  const [training, setTraining] = useState<number | undefined>();
  const [calories, setCalories] = useState<string | undefined>();
  const [weight, setWeight] = useState<number>(0);

  const inputColor = useColorModeValue("black", "white");

  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      const getWeight = async () => {
        const { data } = await axios({
          method: "get",
          url: `${url}UserAccount/getCurrentWeight`,
          headers: {
            Authorization: AuthHeader(),
          },
        });
        setWeight(parseInt(data));
      };

      getWeight();
    }
  }, []);

  const calculateResult = () => {
    let calories = weight * 24;
    calories = gender == "0" ? calories : calories * 0.9;
    calories =
      parseInt(age || "0") > 30
        ? (calories *
            (100 - Math.round((parseInt(age || "0") - 30) / 10) * 10)) /
          100
        : calories;
    calories =
      somaticType == "0"
        ? calories * 0.95
        : somaticType == "2"
        ? calories * 1.05
        : calories;
    calories =
      objective.type == "0"
        ? (calories * (90 - objective.rate)) / 100
        : objective.type == "2"
        ? (calories * (110 + objective.rate)) / 100
        : calories;
    calories = (calories * (110 + 2 * (activity || 0))) / 100;
    calories = isTraining
      ? calories + ((training || 0) + 3) * weight
      : calories;
    setCalories(calories.toFixed(0).toString());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container sx={{ display: "flex", p: 7, flexDirection: "column" }}>
      <Stack alignItems="center">
        <Heading size="xl">Calorie calculator</Heading>
        <Heading size="md" textAlign="center" width="50%">
          Calculate your calories
        </Heading>
        <Text textAlign="center" width="50%" data-testid="calorie-text">
          Recommendation calories {calories}
        </Text>
      </Stack>
      <Stack pt={6} flexDirection="column" spacing={3}>
        <FormControl color="black" zIndex={13}>
          <FormLabel color={inputColor}>Gender</FormLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e as string)}
            options={GENDER}
          />
        </FormControl>
        <FormControl zIndex={12}>
          <FormLabel>Age</FormLabel>
          <Input
            border="1px solid"
            borderColor="#ccc"
            type={"number"}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormControl>
        <FormControl color="black" zIndex={11}>
          <FormLabel color={inputColor}>Somatic type</FormLabel>
          <Select
            value={somaticType}
            onChange={(e) => setSomaticType(e as string)}
            options={SOMATIC_TYPES}
          />
        </FormControl>
        <FormControl color="black" zIndex={10}>
          <FormLabel color={inputColor}>Objective</FormLabel>
          <Select
            value={objective.type}
            onChange={(e) => setObjective({ ...objective, type: e as string })}
            options={OBJECTIVE}
          />
        </FormControl>
        {!isAuthenticated && (
          <FormControl>
            <FormLabel color={inputColor}>Weight</FormLabel>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
          </FormControl>
        )}
        {objective.type != "1" && (
          <FormControl>
            <Heading size="md">Question 1</Heading>
            <Text>
              On a scale of 1 to 10, how fast do you want to achieve this goal?
            </Text>
            <Slider
              zIndex={2}
              defaultValue={0}
              step={1}
              min={0}
              max={10}
              value={objective.rate}
              onChange={(e: any) =>
                setObjective({ ...objective, rate: e.target?.value })
              }
            >
              <SliderTrack>
                <SliderFilledTrack bgColor={"lightPallette.accent.200"} />
              </SliderTrack>
              <SliderThumb bgColor={"lightPallette.accent.main"} />
            </Slider>
          </FormControl>
        )}
        <FormControl>
          <Heading size="md">Question 2</Heading>
          <Text>
            On a scale of 1 to 10, how active are you on a day to day basis?
          </Text>
          <Slider
            zIndex={2}
            defaultValue={0}
            step={1}
            min={0}
            max={10}
            value={activity}
            onChange={(e: any) => setActivity(e)}
          >
            <SliderTrack>
              <SliderFilledTrack bgColor={"lightPallette.accent.200"} />
            </SliderTrack>
            <SliderThumb bgColor={"lightPallette.accent.main"} />
          </Slider>
        </FormControl>
        <FormControl>
          <Heading size="md">Question 3</Heading>
          <Text>Are you doing any type of exercises?</Text>
          <Checkbox
            checked={isTraining}
            value={0}
            onChange={() => {
              setIsTraining(!isTraining);
            }}
          />
        </FormControl>
        {isTraining && (
          <FormControl>
            <Heading size="md">Question 4</Heading>
            <Text>On a scale of 1 to 5, how intense do you train?</Text>
            <Slider
              zIndex={2}
              defaultValue={0}
              step={1}
              min={0}
              max={5}
              value={training}
              onChange={(e: any) => setTraining(e)}
            >
              <SliderTrack>
                <SliderFilledTrack bgColor={"lightPallette.accent.200"} />
              </SliderTrack>
              <SliderThumb bgColor={"lightPallette.accent.main"} />
            </Slider>
          </FormControl>
        )}
      </Stack>
      <Button
        data-testid="calorie-button"
        colorScheme={"lightPallette.primary"}
        onClick={calculateResult}
      >
        Calculate
      </Button>
    </Container>
  );
};

export default CaloriesCalculator;
