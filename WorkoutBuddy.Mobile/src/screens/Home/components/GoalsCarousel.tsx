import React, { useEffect, useState } from "react";
import { Carousel } from "react-native-basic-carousel";
import { IGoal } from "../../../interfaces/Split";
import { Flex, Heading, Text } from "native-base";
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goals } from "../ChangeGoals/Goals";

const GoalsCarousel = ({ refresh }: { refresh: any }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const getGoals = async () => {
      let goals = JSON.parse(await AsyncStorage.getItem("goals"));
      console.log(goals);
      let formatedGoals = [];
      for (let key of Object.keys(goals)) {
        if (goals[key].isSelected) {
          formatedGoals.push({
            ...goals[key],
            id: key,
            name: Goals[key].name,
            target: parseInt(goals[key].target),
            value: parseInt(goals[key].value),
          });
        }
      }
      console.log(formatedGoals);
      setGoals(formatedGoals);
    };
    getGoals();
  }, [refresh]);

  return (
    <>
      {goals && goals.length > 0 && (
        <Carousel
          data={goals}
          renderItem={({ item, index }: { item: IGoal; index: number }) => {
            return (
              <Flex alignItems={"center"} px="3">
                <CircularProgress
                  value={parseInt(
                    ((item.value * 100) / item.target).toString().split(".")[0]
                  )}
                  radius={70}
                  activeStrokeColor={"#DCA950"}
                  title={"%"}
                />
                <Heading size="md" mt="3">
                  {item.name}
                </Heading>
                <Text bold>
                  {item.value}/{item.target}
                </Text>
              </Flex>
            );
          }}
          itemWidth={300}
          pagination
          autoplay
        />
      )}
    </>
  );
};

export default GoalsCarousel;
