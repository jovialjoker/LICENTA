import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { accountActions } from "../../../store/reducers/account";
import axios from "axios";
import { useDispatch } from "react-redux";

const loginModelInitialState = {
  email: "",
  password: "",
  areCredentialsInvalid: false,
  isDisabled: false,
};

export default function Login() {
  const dispatcher = useDispatch();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginModel, setLoginModel] = useState(loginModelInitialState);

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "https://localhost:7132/UserAccount/login",
        data: loginModel,
      });
      dispatcher(accountActions.login(res.data));

      window.location.href = "/";
    } catch (e: any) {
      setAuthError("Your email/password combination is not correct!");
    }
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
          borderColor="lightPallette.primary.main"
          borderWidth="2px"
        >
          <Stack spacing={4}>
            {authError && <Text color="red.700">{authError}</Text>}
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                data-testid="email-login-input"
                type="email"
                value={loginModel.email}
                onChange={(e) => {
                  setAuthError(null);
                  setLoginModel({ ...loginModel, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                data-testid="password-login-input"
                type="password"
                value={loginModel.password}
                onChange={(e) => {
                  setAuthError(null);
                  setLoginModel({ ...loginModel, password: e.target.value });
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox checked={false} data-testid="remember-login-checkbox">
                  Remember me
                </Checkbox>
                <Link
                  color={useColorModeValue(
                    "lightPallette.accent.main",
                    "darkPallette.accent.main"
                  )}
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                colorScheme={useColorModeValue(
                  "lightPallette.primary",
                  "darkPallette.primary"
                )}
                onClick={submitHandler}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
