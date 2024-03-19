import Select from "react-select";
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import useColors from "./colors";
import CustomeSlider from "../../components/CustomeSlider";
import { SearchIcon } from "@chakra-ui/icons";
interface ISplitsSearchFiltersProps {
  data: any;
  selectPlaceholder: string;
  inputPlaceholder?: string;
  isRangeEnabled: boolean;
  selectedOptions?: any;
  handleSelectGroup?: (e: any) => void;
  handleSubmitSearch?: (input: string) => void;
  searchParams: string;
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
}

const SplitsSearchFilters = (props: ISplitsSearchFiltersProps) => {
  const colors = useColors();

  return (
    <Box color={"gray.800"} bg={"white"} mt={7} borderRadius="4px">
      <Text fontSize="xl" mb={2}>
        Library
      </Text>
      {props.data.length > 0 && (
        <Select
          onChange={(e) => props.handleSelectGroup!(e)}
          value={props.selectedOptions}
          placeholder={props.selectPlaceholder}
          closeMenuOnSelect={false}
          options={props.data}
          isMulti
        />
      )}
      {props.isRangeEnabled && (
        <CustomeSlider
          min={0}
          max={50}
          stepToNumber={0}
          stepToIndex={0}
          stepByNumber={0}
          defaultValue={[0, 50]}
          aria-label={["min-rate", "max-rate"]}
        />
      )}
      {props.inputPlaceholder && (
        <InputGroup mt={6}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.900" />
          </InputLeftElement>
          <Input
            bg={"darkPallette.accent.100"}
            _placeholder={{ color: "black" }}
            placeholder={props.inputPlaceholder}
            size="md"
            value={props.searchParams}
            onChange={(e) => props.setSearchParams(e.target.value)}
          />
        </InputGroup>
      )}

      <Button
        onClick={() => props.handleSubmitSearch?.(props.searchParams)}
        marginTop={"10px"}
        w={"100%"}
        colorScheme={colors.primaryScheme}
      >
        Search
      </Button>
    </Box>
  );
};

export default SplitsSearchFilters;
