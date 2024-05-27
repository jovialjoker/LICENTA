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
import { endpoints } from "../../utils/constants/endpoints";

export default function HomeScreen({ navigation, route }) {
  const [currentSplit, setCurrentSplit] = useState({} as ISplitListItem);

  useEffect(() => {
    const getValues = async () => {
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoints.UserSplit.GetCurrentSplit}`,
        headers: {
          Authorization: authHeader,
        },
      });
      setCurrentSplit(data);
    };
    getValues();
  }, [route.params?.refreshFlag]);

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
            onPress={() => navigation.navigate("ChooseAction")}
          >
            <Heading color="black" textAlign={"center"}>
              Add progress
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
        <FeatureList
          navigation={navigation}
          currentSplit={currentSplit}
          refresh={route.params?.refreshFlag}
        />
      </ScrollView>
    </Flex>
  );
}
