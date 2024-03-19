import { Heading, Box, Stack, GridItem } from "@chakra-ui/react";
import SplitCard from "./SplitCard";

const SplitsList = (props: any) => {
  return (
    <Box>
      <Heading>Splits</Heading>

      <Stack>
        {props.splits?.map((split: any) => {
          return <SplitCard key={split.splitId} split={split}></SplitCard>;
        })}
      </Stack>
    </Box>
  );
};

export default SplitsList;
