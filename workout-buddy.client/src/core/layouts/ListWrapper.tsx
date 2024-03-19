import {Box, Container, Grid} from "@chakra-ui/react";
import React from "react";

interface IListWrapperProps {
    children: React.ReactNode
}

const ListWrapper = (props: IListWrapperProps) => {
    return (
        <Box m={{ md: 5, base: 2}} display={"flex"} justifyContent="center" flexDir={"column"}>
            <Container maxW={{ base: "100%", md: "90%" }} p={{ base: 1, md: 4}}>
                <Grid templateColumns="repeat(4, 1fr)" gap={{ base: 4, md: 12 }}>
                    {props.children}
                </Grid>
            </Container>
        </Box>
    )
}

export default ListWrapper;