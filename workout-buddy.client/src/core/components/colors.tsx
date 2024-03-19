import { useColorModeValue } from "@chakra-ui/react";

function useColors() {
  return {
    primaryColor: useColorModeValue(
      "lightPallette.primary.500",
      "darkPallette.primary.200"
    ),
    signInBtnHover: useColorModeValue(
      "lightPallette.primary.700",
      "darkPallette.primary.400"
    ),
    bgHover: useColorModeValue("gray.200", "gray.700"),
    backgroundHeader: useColorModeValue(
      "lightPallette.background.main",
      "darkPallette.background.main"
    ),
    primaryScheme: useColorModeValue(
      "lightPallette.primary",
      "darkPallette.primary"
    ),
  };
}
export default useColors;
