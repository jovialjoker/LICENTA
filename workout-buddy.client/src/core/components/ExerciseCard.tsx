import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Flex,
  Box,
  Center,
  GridItem,
  Stack,
  useColorModeValue,
  Text,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AuthHeader from "../../utils/authorizationHeaders";
import axios from "axios";
import { url } from "../../env";

export const ExerciseCard = ({ exercise }: { exercise: any }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [triggerRemove, setTriggerRemove] = useState(false);

  async function approveHandler() {
    setTriggerRemove(!triggerRemove);
    await axios.post(`${url}Exercises/approve`, exercise.exerciseId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthHeader(),
      },
    });
  }

  async function deleteHandler() {
    setTriggerRemove(!triggerRemove);
    await axios.post(`${url}Exercises/reject`, exercise.exerciseId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthHeader(),
      },
    });
  }

  return (
    <>
      {!triggerRemove && (
        // <Card sx={{ maxWidth: 345 }} padding={"3"}>
        //   <CardHeader
        //     border={"1px solid #eaeaea"}
        //     as="img"
        //     height="140"
        //     src={`${url}Image/getImageById?id=${exercise.idImage}`}
        //     alt={exercise.name}
        //   />
        //   <CardBody
        //     display={"flex"}
        //     flexDir="column"
        //     alignItems={"center"}
        //     justifyContent={"center"}
        //   >
        //     <Heading size="md" as="div">
        //       Name of exercise: {exercise.name}
        //     </Heading>
        //     <Heading size="sm" color="text.secondary">
        //       Type of exercise: {exercise.exerciseType}
        //     </Heading>
        //     <Flex marginTop="3" justifyContent={"space-between"} width={"70%"}>
        //       <Button color="secondary" onClick={approveHandler}>
        //         Accept
        //       </Button>
        //       <Button bgColor="red.400" onClick={deleteHandler}>
        //         Delete
        //       </Button>
        //     </Flex>
        //   </CardBody>
        // </Card>
        <GridItem w="100%">
          <Center py={12} h={"full"}>
            <Box
              role={"group"}
              p={6}
              maxW={"330px"}
              w={"full"}
              h={"full"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              opacity={"1"}
            >
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={"230px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${`${url}Image/getImageById?id=${exercise.idImage}`})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}
              >
                <Image
                  loading="eager"
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  src={`${url}Image/getImageById?id=${exercise.idImage}`}
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  {exercise.exerciseType}
                </Text>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {exercise.name}
                </Heading>
              </Stack>
              <Stack mt={8} direction={"row"} spacing={4}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                  onClick={approveHandler}
                >
                  Accept
                </Button>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _hover={{
                    bg: "red.200",
                  }}
                  bgColor="red.400"
                  onClick={onOpen}
                >
                  Reject
                </Button>
              </Stack>
            </Box>
          </Center>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text>Reject exercise</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  ml={2}
                  colorScheme="lightPallette.primary"
                  onClick={deleteHandler}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>
      )}
    </>
  );
};
