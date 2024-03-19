import { useState } from "react";
import { Card, CardHeader, CardBody, Heading, Button, Flex } from "@chakra-ui/react";
import AuthHeader from "../../utils/authorizationHeaders";
import axios from "axios";

export const ExerciseCard = ({ exercise }: { exercise: any }) => {
  const [triggerRemove, setTriggerRemove] = useState(false);

  async function approveHandler() {
    setTriggerRemove(!triggerRemove);
    await axios.post(
      `http://localhost:8082/Exercises/approve`,
      exercise.exerciseId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthHeader(),
        },
      }
    );
  }

  async function deleteHandler() {
    setTriggerRemove(!triggerRemove);
    await axios.post(
      `http://localhost:8082/Exercises/reject`,
      exercise.exerciseId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthHeader(),
        },
      }
    );
  }

  return (
    <>
      {!triggerRemove && (
        <Card sx={{ maxWidth: 345 }} padding={"3"}>
          <CardHeader
          border={"1px solid #eaeaea"}
            as="img"
            height="140"
            src={`http://localhost:8082/Image/getImageById?id=${exercise.idImage}`}
            alt={exercise.name}
          />
          <CardBody display={"flex"} flexDir="column" alignItems={"center"} justifyContent={"center"}>
            <Heading size="md" as="div">
              Name of exercise: {exercise.name}
            </Heading>
            <Heading size="sm" color="text.secondary">
              Type of exercise: {exercise.exerciseType}
            </Heading>
            <Flex marginTop="3" justifyContent={"space-between"} width={"70%"}>
              <Button
                color="secondary"
                onClick={approveHandler}
              >
                Accept
              </Button>
              <Button
                bgColor="red.400"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </Flex>
          </CardBody>
        </Card>
      )}
    </>
  );
};
