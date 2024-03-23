import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
]);

export default function App() {
  return (
    <NativeBaseProvider>
      <Box
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        Hello world
      </Box>
    </NativeBaseProvider>
  );
}
