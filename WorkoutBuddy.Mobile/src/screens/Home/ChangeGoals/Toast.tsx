import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  VStack,
  Text,
} from "native-base";
import React from "react";

export const ToastAlert = ({ id, title, description }: any) => (
  <Alert
    maxWidth="90%"
    alignSelf="center"
    flexDirection="row"
    status={"error"}
    variant={"left-accent"}
  >
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text
            fontSize="md"
            fontWeight="medium"
            flexShrink={1}
            color={"darkText"}
          >
            {title}
          </Text>
        </HStack>
      </HStack>
      <Text px="6" color={"darkText"}>
        {description}
      </Text>
    </VStack>
  </Alert>
);
