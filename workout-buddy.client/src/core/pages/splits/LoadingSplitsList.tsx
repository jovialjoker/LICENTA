import { Box, Flex, GridItem, Heading, SkeletonText } from "@chakra-ui/react";

export default function LoadingSplitsList() {
  const skeletons = [...Array(5)].map((element) => (
    <Box boxShadow="lg" bg="white" my={6}>
      <Flex>
        <Box rounded="md" h="250px" w="50%" bg={"#b3b7bc"}></Box>
        <SkeletonText
          w="50%"
          mx={4}
          mt={12}
          noOfLines={4}
          spacing="4"
          skeletonHeight="2"
        />
      </Flex>
    </Box>
  ));
  return (
    <GridItem colSpan={3}>
      <Heading>Splits</Heading>
      {skeletons.map((skeleton) => skeleton)}
    </GridItem>
  );
}
