import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../../core/components/Header";
import Footer from "../components/Footer";
import {Box, Container} from "@chakra-ui/react";

interface IGeneralLayoutProps {
}

const GeneralLayout = (props: IGeneralLayoutProps) => {
    return (
        <Box width={"100%"} height={"100vh"} display="flex" flexDirection="column">
            <Header/>
            <Outlet/>
            <Footer/>
        </Box>
    );
};

export default GeneralLayout;
