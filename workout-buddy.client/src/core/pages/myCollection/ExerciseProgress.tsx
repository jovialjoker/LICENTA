import React, { useEffect, useState } from "react";
import { IExerciseModel } from "./ViewExerciseProgress";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import useColors from "../../components/colors";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";

interface IExerciseProgress {
  exercise: IExerciseModel;
}

const ExerciseProgress = ({ exercise }: IExerciseProgress) => {
  const colors = useColors();
  const [isClicked, setIsClicked] = useState({
    isProgress: true,
    isChart: false,
  });

  const clickHandler = (btnIndex: number) => {
    switch (btnIndex) {
      case 0: {
        setIsClicked({ isProgress: true, isChart: false });
        break;
      }
      case 1: {
        setIsClicked({ isProgress: false, isChart: true });
        break;
      }
      default:
        break;
    }
  };
  return (
    <Card width={"70rem"} bg={"rgba(0, 0, 0, 0.1)"} my={4}>
      <CardHeader>
        <Flex>
          <Heading size={"md"} width={"30%"}>
            {exercise.exerciseName}
          </Heading>
          <Flex width={"70%"} justifyContent="center">
            <Flex justifyContent={"space-around"} width={"80%"}>
              <Button
                onClick={() => clickHandler(0)}
                bg={isClicked.isProgress ? colors.primaryColor : "ButtonFace"}
              >
                Progress Info
              </Button>
              <Button
                onClick={() => clickHandler(1)}
                bg={isClicked.isChart ? colors.primaryColor : "ButtonFace"}
              >
                Progress chart
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody w={"100%"}>
        <Flex width={"100%"}>
          {isClicked.isProgress ? (
            <TableContainer w={"100%"}>
              <Table variant="striped" bgcolor="white" borderRadius={"2xl"}>
                <TableCaption>This is your progress for this week</TableCaption>
                <Thead>
                  <Tr>
                    <Th align="center">Set no</Th>
                    {exercise.days.map((day, index) => (
                      <Th
                        key={"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                          /[xy]/g,
                          function (c) {
                            var r = (Math.random() * 16) | 0,
                              v = c === "x" ? r : (r & 0x3) | 0x8;
                            return v.toString(16);
                          }
                        )}
                        align="center"
                      >
                        {new Date(day.date).getDate() +
                          "/" +
                          (new Date(day.date).getMonth() + 1) +
                          "/" +
                          new Date(day.date).getFullYear()}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.from(Array(exercise.maxSets).keys()).map((i) => {
                    const setElements = [<td>{i + 1}</td>];

                    for (let index = 0; index < exercise.days.length; index++) {
                      try {
                        if (
                          exercise.days[index].sets[i].distance != null &&
                          exercise.days[index].sets[i].duration != null
                        ) {
                          setElements.push(
                            <td
                              key={"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                                /[xy]/g,
                                function (c) {
                                  var r = (Math.random() * 16) | 0,
                                    v = c === "x" ? r : (r & 0x3) | 0x8;
                                  return v.toString(16);
                                }
                              )}
                            >
                              {exercise.days[index].sets[i].distance} m x
                              {exercise.days[index].sets[i].duration} mins
                            </td>
                          );
                        } else if (
                          exercise.days[index].sets[i].reps != null &&
                          exercise.days[index].sets[i].weight != null
                        ) {
                          setElements.push(
                            <td
                              key={"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                                /[xy]/g,
                                function (c) {
                                  var r = (Math.random() * 16) | 0,
                                    v = c === "x" ? r : (r & 0x3) | 0x8;
                                  return v.toString(16);
                                }
                              )}
                            >
                              {exercise.days[index].sets[i].reps} reps x
                              {exercise.days[index].sets[i].weight} kgs
                            </td>
                          );
                        }
                      } catch {
                        setElements.push(<td></td>);
                      }
                    }

                    return <Tr key={i}>{setElements}</Tr>;
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Flex w={"70rem"} h={400} bg={"white"} borderRadius={"3xl"}>
              <ResponsiveLine
                data={[
                  {
                    id: "ex",
                    colors: "hsl(3, 60%, 80%)",
                    data: exercise.days.map((day) => ({
                      x:
                        new Date(day.date).getDate() +
                        "/" +
                        (new Date(day.date).getMonth() + 1) +
                        "/" +
                        new Date(day.date).getFullYear(),
                      y: day.exerciseCoef,
                    })),
                  },
                ]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "date",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "coefficient",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ExerciseProgress;
