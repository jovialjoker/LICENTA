import { Box, Flex, Heading, Divider, Button, Text, Center } from "native-base";
import React from "react";
import { Carousel } from "react-native-basic-carousel";
import CircularProgress from "react-native-circular-progress-indicator";
import { IGoal, ISplitListItem } from "../../../interfaces/Split";

interface IFeatureList {
  currentSplit: ISplitListItem;
  goalsList: IGoal[];
  navigation: Function;
}

export default function FeatureList({
  currentSplit,
  goalsList,
  navigation,
}: IFeatureList) {
  return (
    <Box>
      <Flex width={"100%"} mb="5">
        <Flex
          mt="2"
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={"row"}
        >
          <Heading>Current split</Heading>
          <Button
            w="50%"
            variant={"outline"}
            onPress={() => {
              navigation.navigate("ChangeSplit");
            }}
            borderColor={"#DCA950"}
            borderRadius={"xl"}
            _pressed={{ bgColor: "#e0c598" }}
          >
            <Text>{currentSplit ? "Change the current split" : "Select split"}</Text>
          </Button>
        </Flex>
        {currentSplit ? (
          <Flex marginX={"auto"} width={"70%"} mt="5">
            <Flex alignItems={"center"}>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                bgColor={"#DCA950"}
                w={"100%"}
                borderTopRadius={"3xl"}
                p="3"
              >
                <Heading>{currentSplit.name}</Heading>
              </Flex>
              <Divider></Divider>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                bgColor={"white"}
                w={"100%"}
                borderBottomRadius={"3xl"}
                p="3"
              >
                <Text italic>{currentSplit.description}</Text>
                <Text>
                  Workouts no: <Text bold>{currentSplit.workoutsNo}</Text>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Center h="20">
            <Text>No selected split</Text>
          </Center>
        )}
      </Flex>
      <Divider></Divider>
      <Flex mt="5">
        <Flex
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb="5"
        >
          <Heading>Goals progress</Heading>
          <Button
            w="50%"
            variant={"outline"}
            onPress={() => {
              console.log("pressed");
            }}
            borderColor={"#DCA950"}
            borderRadius={"xl"}
            _pressed={{ bgColor: "#e0c598" }}
          >
            <Text>Change your goals</Text>
          </Button>
        </Flex>

        <Flex alignItems="center" mt="3">
          <Carousel
            data={goalsList}
            renderItem={({ item, index }: { item: IGoal; index: number }) => (
              <Flex alignItems={"center"} px="3">
                <CircularProgress
                  value={item.percent}
                  radius={70}
                  activeStrokeColor={"#DCA950"}
                  title={"%"}
                />
                <Heading size="md" mt="3">
                  {item.name}
                </Heading>
                <Text bold>
                  {item.currentValue}/{item.targetValue}
                </Text>
              </Flex>
            )}
            itemWidth={300}
            pagination
            autoplay
          />
        </Flex>
      </Flex>
    </Box>
  );
}
