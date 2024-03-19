import {useColorModeValue} from "@chakra-ui/react";

export default function useColors () {
    return {
        primaryScheme: useColorModeValue("lightPallette.primary", "darkPallette.primary"),
        accentColor: useColorModeValue("lightPallette.accent.300", "yellow.300")
    }
}