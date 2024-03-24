import { CloseIcon, HStack, IconButton, VStack, Text } from "native-base";
import React from "react";
import { Alert } from "native-base";

const AlertComponent = ({isSuccessful, alertHandler, text}: {isSuccessful: boolean, alertHandler: Function, text:string}) => {
  return (
    <Alert
      mt={"5"}
      alignSelf={"center"}
      w="95%"
      status={isSuccessful ? "success" : "error"}
      variant={"left-accent"}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {text}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" onPress={() => alertHandler(false)} />}
            _icon={{
              color: "coolGray.600",
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertComponent;
