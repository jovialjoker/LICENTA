import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, Button, GridItem, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListWrapper from "../../layouts/ListWrapper";
import useColors from "../home/colors";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../../utils/authorizationHeaders";
import axios from "axios";
import UserSplitCard from "./UserSplitCard";

export interface ISplitViewModel {
    splitId: string;
    name: string;
    description: string;
    workoutsNo: number;
}

const UserSplitsList = () => {
    const colors = useColors();
    const navigate = useNavigate();
    const [splits, setSplits] = useState([] as ISplitViewModel[]);

    useEffect(() => {
        const getSplits = async () => {
            const { data } = await axios({
                method: "get",
                url: "http://localhost:8082/UserSplit/ListOfSplits",
                headers: {
                    Authorization: AuthHeader(),
                },
            });
            setSplits(data);
        };
        getSplits();
    }, []);

    return (
        <ListWrapper>
            <GridItem colSpan={3}>
                <Box
                    style={{
                        justifyContent: "space-between",
                        display: "flex",
                    }}
                >
                    <Heading>Your split collection</Heading>
                </Box>

                <Stack>
                    {splits.map((split: ISplitViewModel) => {
                        return <UserSplitCard key={split.splitId} split={split}></UserSplitCard>;
                    })}
                </Stack>
            </GridItem>
        </ListWrapper>
    );
};

export default UserSplitsList;
