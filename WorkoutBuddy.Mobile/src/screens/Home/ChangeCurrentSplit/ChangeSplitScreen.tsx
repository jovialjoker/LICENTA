import {
  Button,
  Divider,
  Flex,
  Heading,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../../utils/constants/endpoints";
import env from "../../../utils/constants/env";
import AuthHeader from "../../../utils/SetAuthHeader";
import axios from "axios";
import { ISplitListItem } from "../../../interfaces/Split";
import SplitItem from "./components/SplitItem";

const ChangeSplitScreen = ({navigation, route}) => {
  const [splitsList, setSplitsList] = useState<ISplitListItem[]>([]);
  const [selectedSplit, setSelectedSplit] = useState<string>("");

  useEffect(() => {
    const getUserSplits = async () => {
      let authHeader = await AuthHeader();
      const { data } = await axios({
        method: "get",
        url: `${env.NGROK_URL}/${endpoints.UserSplit.GetSplits}`,
        headers: {
          Authorization: authHeader,
        },
      });
      setSplitsList(data);
      const currentSplit = data.find(
        (split: ISplitListItem) => split.isCurrentSplit
      );
      setSelectedSplit(currentSplit.splitId);
    };
    getUserSplits();
  }, []);

  const handleChange = async () => {
    let authHeader = await AuthHeader();

    let {status} = await axios.post(`${env.NGROK_URL}/${endpoints.UserSplit.ChangeCurrentSplit}`, selectedSplit, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
        });
    if(status == 200){
      navigation.navigate("Home", {refreshFlag: selectedSplit})
    }
  }

  return (
    <Flex h="100%" w="100%" bgColor="#F1F2EB" p="5">
      <Flex h="90%">
        <ScrollView flexGrow={1}>
          {splitsList &&
            splitsList.length > 0 &&
            splitsList.map((split: ISplitListItem) => (
              <SplitItem
                split={split}
                selectedSplit={selectedSplit}
                changedSelectedSplitHandler={setSelectedSplit}
              />
            ))}
        </ScrollView>
      </Flex>
      <Flex>
        <Button bgColor={"#4E81D9"} borderRadius={"full"} onPress={handleChange}>Change Split</Button>
      </Flex>
    </Flex>
  );
};

export default ChangeSplitScreen;
