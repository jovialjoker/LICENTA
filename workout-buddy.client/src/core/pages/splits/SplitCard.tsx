import { StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useColors from "./colors";

interface ISplitCardProps {
  split: any;
}

export default function SplitCard({ split }: ISplitCardProps) {
  const colors = useColors();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const roles = sessionStorage.getItem("roles");
    if (roles) {
      setIsAdmin(roles.includes("Admin"));
    }
  }, []);

  const viewHandler = (id: string) => {
    navigate(`/splits/${id}`);
  };

  const editHandler = (id: string) => {
    navigate(`/splits/insert-split?id=${id}`);
  };

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius={{ sm: "3xl" }}
        width={"100%"}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={colors.cardColor}
        boxShadow={"2xl"}
        spacing={8}
      >
        <Flex
          flex={1}
          borderLeftRadius={{ md: "3xl", base: "none" }}
          bgColor={"#393E46"}
          alignItems="center"
          justifyContent="center"
          color="#efefef"
        >
          <Heading>{split.name}</Heading>
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={4}
          pt={2}
        >
          <HStack>
            <Heading
              display="flex"
              lineHeight="30px"
              alignItems="center"
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              Rating: {split.rating} <StarIcon ml={1} color="yellow" />
            </Heading>
          </HStack>

          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            @{split.creatorName}
          </Text>
          <Text textAlign={"center"} color={colors.descriptionText} px={3}>
            {split.description}
          </Text>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Text>Workouts: </Text>
            <Flex flexWrap="wrap">
              {split.workouts.map((w: any, index: number) => {
                return (
                  <Badge
                    px={2}
                    py={1}
                    bg={colors.badgeBg}
                    fontWeight={"400"}
                    key={index}
                  >
                    {w}
                  </Badge>
                );
              })}
            </Flex>
          </Stack>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              onClick={() => viewHandler(split.splitId)}
            >
              View
            </Button>
            {isAdmin && (
              <>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                  onClick={() => editHandler(split.splitId)}
                >
                  Edit
                </Button>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"red.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(220 20 60 / 48%), 0 10px 10px -5px rgb(220 20 60 / 43%)"
                  }
                  _hover={{
                    bg: "red.500",
                  }}
                  _focus={{
                    bg: "red.500",
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
