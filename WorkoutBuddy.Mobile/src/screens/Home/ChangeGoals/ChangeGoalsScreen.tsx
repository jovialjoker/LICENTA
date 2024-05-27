import {
  Button,
  CheckCircleIcon,
  CircleIcon,
  Divider,
  Flex,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Goals } from "./Goals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAlert } from "./Toast";
import env from "../../../utils/constants/env";
import { endpoints } from "../../../utils/constants/endpoints";
import axios from "axios";
import AuthHeader from "../../../utils/SetAuthHeader";

const ChangeGoalsScreen = ({ navigation }) => {
  const toast = useToast();
  const [selectedGoals, setSelectedGoals] = useState({
    0: { isSelected: false, target: null, value: 0 },
    1: { isSelected: false, target: null, value: 0 },
    2: { isSelected: false, target: null, value: 0 },
  });
  useEffect(() => {
    const getGoals = async () => {
      let goals = JSON.parse(await AsyncStorage.getItem("goals"));
      setSelectedGoals(goals);
    };
    getGoals();
  }, []);

  const handleChange = async () => {
    if (
      Object.values(selectedGoals).filter(
        (g) => g.isSelected && g.target == null
      ).length == 0
    ) {
      let weightValue = 0;
      if (selectedGoals[2].isSelected) {
        let authHeader = await AuthHeader();
        const { data } = await axios({
          method: "get",
          url: `${env.NGROK_URL}/${endpoints.User.GetCurrentWeight}`,
          headers: {
            Authorization: authHeader,
          },
        });

        weightValue = data;
      }

      let prsValue = 0;
      if (selectedGoals[1].isSelected) {
        let authHeader = await AuthHeader();
        const { data } = await axios({
          method: "get",
          url: `${env.NGROK_URL}/${endpoints.UserSplit.GetNoOfPrsInThisWeek}`,
          headers: {
            Authorization: authHeader,
          },
        });

        prsValue = data;
      }

      let workoutsValue = 0;
      if (selectedGoals[0].isSelected) {
        let authHeader = await AuthHeader();
        const { data } = await axios({
          method: "get",
          url: `${env.NGROK_URL}/${endpoints.UserSplit.GetNoOfWorkoutsInThisWeek}`,
          headers: {
            Authorization: authHeader,
          },
        });

        workoutsValue = data;
      }
      await AsyncStorage.setItem(
        "goals",
        JSON.stringify({
          ...selectedGoals,
          1: { ...selectedGoals[1], value: prsValue },
          0: { ...selectedGoals[0], value: workoutsValue },
          2: { ...selectedGoals[2], value: weightValue },
        })
      );
      navigation.navigate("Home", { refreshFlag: Date.now() });
    } else {
      toast.show({
        render: ({ id }) => {
          return (
            <ToastAlert
              id={id}
              title="Target not set"
              description="In order to change the goals you need to set a target for each goal set"
            />
          );
        },
      });
    }
  };

  return (
    <>
      <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
        <Flex h="90%">
          <ScrollView flexGrow={1}>
            {Goals.map((goal, index) => (
              <Pressable
                key={index}
                borderWidth={"1px"}
                rounded={"md"}
                p={3}
                onPress={() => {
                  setSelectedGoals({
                    ...selectedGoals,
                    [index]: {
                      ...selectedGoals[index],
                      target: selectedGoals[index].isSelected
                        ? selectedGoals[index].target
                        : null,
                      isSelected: !selectedGoals[index].isSelected,
                    },
                  });
                }}
                my={2}
                bgColor={"white"}
                _pressed={{ backgroundColor: "#FAF9F6" }}
              >
                <Flex
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Text>{goal.name}</Text>
                  {selectedGoals[index].isSelected ? (
                    <CheckCircleIcon color="emerald.500" />
                  ) : (
                    <CircleIcon color="gray.500" />
                  )}
                </Flex>
                {selectedGoals[index].isSelected && (
                  <Flex>
                    <Divider my={1} />
                    <Flex
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text mr="3">Target:</Text>
                      <Input
                        variant={"outline"}
                        w="30%"
                        h="80%"
                        value={selectedGoals[index].target}
                        onChangeText={(val) => {
                          setSelectedGoals({
                            ...selectedGoals,
                            [index]: {
                              ...selectedGoals[index],
                              target: val,
                            },
                          });
                        }}
                      ></Input>
                    </Flex>
                  </Flex>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </Flex>
        <Flex>
          <Button
            bgColor={"#4E81D9"}
            borderRadius={"full"}
            onPress={handleChange}
          >
            Change goals
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ChangeGoalsScreen;
