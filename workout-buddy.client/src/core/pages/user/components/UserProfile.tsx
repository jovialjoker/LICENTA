import {
  Container,
  Flex,
  Heading,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { accountActions } from "../../../../store/reducers/account";
import AuthHeader from "../../../../utils/authorizationHeaders";
import { useState } from "react";

function UserProfile(props: any) {
  const [isEditting, setIsEditting] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    props.setLoading(true);
    try {
      await axios.post(
        "http://localhost:8082/UserAccount/editProfile",
        {
          username: props.user.username,
          name: props.user.name,
          email: props.user.email,
          birthDate: props.user.birthDate,
        },
        {
          headers: {
            Authorization: AuthHeader(),
          },
        }
      );
      sessionStorage.setItem("username", props.user.username);
      dispatch(accountActions.setUser({ username: props.user.username }));
    } catch (e: any) {
      setError(e.message);
    } finally {
      props.setLoading(false);
      setIsEditting(false);
    }
  };
  return (
    <Container
      as="form"
      onSubmit={handleSubmit}
      maxWidth="md"
      noValidate
      style={{ marginTop: "40px", marginBottom: "60px" }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
          }}
          variant="h3"
        >
          My profile
        </Heading>
        <Button
          size="sm"
          type={isEditting ? "submit" : "button"}
          {...(!isEditting && {
            onClick: (e) => {
              e.preventDefault();
              setIsEditting(true);
            },
          })}
          colorScheme={"lightPallette.primary"}
        >
          {isEditting ? "Save" : "Edit"}
        </Button>
      </Flex>
      <Stack spacing={4} style={{ display: "flex", flexDirection: "column" }}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            disabled={!isEditting}
            variant="outlined"
            margin="normal"
            required
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={props.user.name}
            onChange={(e) =>
              props.setUser((prevState: any) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            disabled={!isEditting}
            variant="outlined"
            margin="normal"
            required
            id="username"
            name="username"
            autoComplete="username"
            value={props.user.username}
            onChange={(e) =>
              props.setUser((prevState: any) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            disabled={!isEditting}
            variant="outlined"
            margin="normal"
            required
            id="email"
            name="email"
            autoComplete="email"
            value={props.user.email}
            onChange={(e) =>
              props.setUser((prevState: any) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl id="birthdate" isRequired>
          <FormLabel>Birth Date</FormLabel>
          <Input
            disabled={!isEditting}
            type="datetime-local"
            value={props.user.birthDate}
            onChange={(e) =>
              props.setUser({
                ...props.user,
                birthDate: e.target.value,
              })
            }
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Weight</FormLabel>
          <Input
            variant="outlined"
            margin="normal"
            id="weight"
            name="weight"
            autoComplete="weight"
            type="number"
            disabled
            value={props.user.currentWeight}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Roles</FormLabel>
          <Input
            variant="outlined"
            id="roles"
            name="roles"
            autoComplete="roles"
            value={props.user.roles.join(", ")}
            disabled
          />
        </FormControl>
      </Stack>
    </Container>
  );
}

export default UserProfile;
