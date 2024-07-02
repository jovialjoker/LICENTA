import React, { useEffect, useState } from "react";
import { Spinner, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";

import "react-datepicker/dist/react-datepicker.css";
import UserProfile from "./components/UserProfile";
import UserWeightProgress from "./components/UserWeightProgress";
import { url } from "../../../env";

const EditUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    birthDate: "",
    roles: [],
    currentWeight: 0,
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${url}UserAccount/profilePage`, {
          headers: {
            Authorization: AuthHeader(),
          },
        });
        setUser({ ...data });
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <Grid gridTemplateColumns="repeat(2, 1fr)">
        <GridItem>
          <UserProfile
            loading={loading}
            setLoading={setLoading}
            user={user}
            setUser={setUser}
          />
        </GridItem>
        <GridItem>
          <UserWeightProgress />
        </GridItem>
      </Grid>
    </>
  );
};

export default EditUserPage;
