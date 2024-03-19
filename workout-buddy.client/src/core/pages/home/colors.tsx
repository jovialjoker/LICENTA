import {useColorModeValue} from "@chakra-ui/react";

export default function useColors () {
    return {
        detailsColor: useColorModeValue("ligthPallette.accent.main", "darkPallette.accent.main")
    }
}