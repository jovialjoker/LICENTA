import {useColorModeValue} from "@chakra-ui/react";

export default function useColors () {
    return {
        cardColor: useColorModeValue("white", "gray.900"),
        descriptionText: useColorModeValue("gray.700", "gray.400"),
        badgeBg: useColorModeValue("gray.50", "gray.800"),
        divider: useColorModeValue("gray.200", "gray.600"),
        descriptionSplitText: useColorModeValue("gray.500", "gray.400"),
        workoutName: useColorModeValue("yellow.500", "yellow.300"),
        primaryScheme: useColorModeValue("lightPallette.primary", "darkPallette.primary"),
        accentScheme: useColorModeValue("lightPallette.accent", "darkPallette.accent"),
        filtersPadding: useColorModeValue("12px 12px 12px 0", "30px 20px"),
    }
}