import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AuthHeader from "../../../../utils/authorizationHeaders";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { themeColors } from "../../../../theme/colors";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function UserWeightProgress(props: any) {
  const [weightHistory, setWeightHistory] = useState<any>();
  const token = AuthHeader();

  console.log(weightHistory);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: string, index: number, ticks: any) {
            return value + "kg";
          },
        },
      },
    },
  };

  const data = {
    type: "line",
    labels,
    options,
    datasets: [
      {
        label: "Progress in " + new Date().getFullYear(),
        data: labels.map((label, index) => {
          const filteredWeightsByMonth = weightHistory?.history?.filter(
            (w: any) => {
              return (
                w.date.getMonth() === index &&
                w.date.getDate() === new Date().getDate()
              );
            }
          );
          return filteredWeightsByMonth?.length === 0
            ? "0"
            : (
                filteredWeightsByMonth?.reduce(
                  (acc: number, el: any) => acc + el.weight,
                  0
                ) / filteredWeightsByMonth?.length
              ).toFixed(2);
        }),
        borderColor: themeColors.lightPallette.primary[700],
        backgroundColor: themeColors.lightPallette.primary[300],
      },
    ],
  };

  useEffect(() => {
    const getWeightHistory = async () => {
      let { data } = await axios.get(
        "http://localhost:8082/UserAccount/GetWeightHistory",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setWeightHistory({
        ...data,
        history: [
          ...data.history.map((h: any) => ({ ...h, date: new Date(h.date) })),
        ],
      });
    };
    getWeightHistory();
  }, []);

  const handleAddWeightProgress = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWeightHistory((prevState: any) => ({
      ...prevState,
      history: [
        ...prevState.history,
        { weight: parseInt(weightHistory.weight), date: new Date() },
      ],
    }));
    axios.post(
      "http://localhost:8082/UserAccount/AddToWeightHistory",
      weightHistory,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
  };

  return (
    <Container
      p={8}
      height={"100%"}
      bg={useColorModeValue(
        "lightPallette.accent.100",
        "darkPallette.accent.900"
      )}
      css={{
        "& > canvas": {
          backgroundColor: "white",
          height: "200px",
        },
      }}
    >
      <Heading mb={4}>Weight progress</Heading>
      {weightHistory?.history?.length > 0 && <Line data={data} />}

      <Table variant="simple" height="200px" display="block" overflowX="scroll">
        <TableCaption>Weight progress</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign={"left"}>Weight</Th>
            <Th>Weight difference</Th>
            <Th isNumeric>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {weightHistory?.history?.map((w: any, index: number) => {
            const weightDiff =
              index === 0 ||
              weightHistory.history[index - 1].weight === w.weight
                ? 0
                : w?.weight - weightHistory.history[index - 1]?.weight;

            let weightDiffEl =
              weightDiff === 0 ? (
                <Text fontWeight="800">-</Text>
              ) : (
                <Text
                  color={weightDiff > 0 ? "green" : "red"}
                  display="flex"
                  alignItems="center"
                >
                  {weightDiff > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {Math.abs(weightDiff)}
                </Text>
              );
            return (
              <Tr>
                <Td>{w.weight}</Td>
                <Td>{weightDiffEl}</Td>
                <Td isNumeric>{w.date.toLocaleString("en-GB")}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex mt={6}>
        <InputGroup bg={"white"}>
          <Input
            type="number"
            placeholder="Insert current weight"
            borderRadius={"0"}
            value={weightHistory?.weight}
            onChange={(e) =>
              setWeightHistory((prevState: any) => ({
                ...prevState,
                weight: e.target.value.toString(),
              }))
            }
          />
        </InputGroup>
        <Button
          onClick={handleAddWeightProgress}
          borderRadius={0}
          colorScheme="lightPallette.accent"
        >
          Add weight
        </Button>
      </Flex>
    </Container>
  );
}

export default UserWeightProgress;
