import { Flex, Heading, Divider, Text, Pressable } from 'native-base';
import React from 'react'
import { ISplitListItem } from '../../../../interfaces/Split';

interface ISplitItem{
    split: ISplitListItem,
    selectedSplit: string,
    changedSelectedSplitHandler: Function
}
const SplitItem = ({split,
    selectedSplit,
    changedSelectedSplitHandler}: ISplitItem) => {
  return (<Pressable maxW="96" onPress={() => changedSelectedSplitHandler(split.splitId)} key={split.splitId}>
            {({ isHovered, isFocused, isPressed }: { isHovered: boolean, isFocused: boolean, isPressed:boolean }) => {
              return (
                <Flex
                  marginX={"auto"}
                  width={"90%"}
                  my="5"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                >
                  <Flex
                    alignItems={"center"}
                    {...(split.splitId == selectedSplit
                      ? {
                          borderColor: "#4E81D9",
                          borderWidth: "4",
                          borderRadius: "30",
                        }
                      : {})}
                  >
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      bgColor={"#DCA950"}
                      w={"100%"}
                      borderTopRadius={"3xl"}
                      p="3"
                    >
                      <Heading>{split.name}</Heading>
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
                      <Text italic>{split.description}</Text>
                      <Text>
                        Workouts no: <Text bold>{split.workoutsNo}</Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            }}
    </Pressable>
  )
}

export default SplitItem