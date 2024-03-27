import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  Flex,
  Image,
  Button,
  Heading,
  Divider,
  ScrollView,
  Progress,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthHeader from "../../utils/SetAuthHeader";
import env from "../../utils/constants/env";
import { Carousel } from "react-native-basic-carousel";
import CircularProgress from "react-native-circular-progress-indicator";
import FeatureList from "./components/FeatureList";
import { ISplitListItem } from "../../interfaces/Split";

export default function HomeScreen({ navigation, route }) {
  const [currentUser, setCurrentUser] = useState("");
  const [splitsList, setSplitsList] = useState([]);
  const [currentSplit, setCurrentSplit] = useState({} as ISplitListItem);

  useEffect(() => {
    const getValues = async () => {
      let currentUser = await AsyncStorage.getItem("currentUser");
      setCurrentUser(JSON.parse(currentUser).username);

      const endpoint = "UserSplit/GetCurrentSplit";
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoint}`,
        headers: {
          Authorization: authHeader,
        },
      });
      setCurrentSplit(data);
    };
    getValues();
  }, []);

  return (
    <Flex w="100%">
      <Flex h="27%">
        <Image
          w="100%"
          h="90%"
          source={require("../../../assets/gym.jpg")}
          alt="gym"
        />
        <Flex top="-57%" w="35%" left={"33%"}>
          <Button
            variant={"solid"}
            bgColor={"#DCA950"}
            borderRadius={"full"}
            size={"lg"}
            _pressed={{ bgColor: "#e0c598" }}
          >
            <Heading color="black" textAlign={"center"}>
              Start workout
            </Heading>
          </Button>
        </Flex>
      </Flex>

      <ScrollView
        height={"120%"}
        bgColor={"#F1F2EB"}
        borderRadius={"3xl"}
        top="-60"
        pt="5"
        px="5"
      >
        {currentSplit && (
          <FeatureList
            navigation={navigation}
            currentSplit={currentSplit}
            goalsList={[
              {
                name: "Workouts done this week",
                currentValue: 3,
                targetValue: 7,
                percent: 55,
              },
              {
                name: "Pr's beaten this week",
                currentValue: 1,
                targetValue: 7,
                percent: 8,
              },
            ]}
          />
        )}
      </ScrollView>
    </Flex>
  );
}
