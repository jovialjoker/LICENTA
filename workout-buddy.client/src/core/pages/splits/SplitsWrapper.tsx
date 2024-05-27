import { useState, useEffect, Suspense, lazy } from "react";
import { Button, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../../utils/authorizationHeaders";
import SplitsSearchFilters from "./SplitsSearchFilters";
import useColors from "./colors";
import { SmallAddIcon } from "@chakra-ui/icons";
import Wrapper from "../../layouts/ListWrapper";
import LoadingSplitsList from "./LoadingSplitsList";

const SplitsList = lazy(() => import("./SplitsList"));

const SplitsWrapper = () => {
  const colors = useColors();
  const navigate = useNavigate();
  const [splits, setSplits] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const getSplits = async () => {
      const { data } = await axios({
        method: "get",
        url: "https://localhost:7132/Split/getSplits",
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setSplits(data);
    };
    getSplits();
  }, []);

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get("https://localhost:7132/Exercises/get", {
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setExercises(data);
    };
    getExercises();
  }, []);

  const addHandler = () => {
    navigate("/splits/insert-split");
  };

  return (
    <Wrapper>
      <GridItem colSpan={3}>
        <Suspense fallback={<LoadingSplitsList />}>
          <SplitsList splits={splits} />
        </Suspense>
      </GridItem>
      <GridItem display="flex" flexDirection="column">
        <Button
          marginTop={"68px"}
          colorScheme={colors.primaryScheme}
          variant="outline"
          onClick={addHandler}
        >
          <SmallAddIcon mr={1} h={6} />
          Add new split
        </Button>
      </GridItem>
    </Wrapper>
  );
};

export default SplitsWrapper;
