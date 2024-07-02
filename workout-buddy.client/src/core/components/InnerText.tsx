import {
  Box,
  Heading,
  Text,
  Card,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const InnerText = () => {
  return (
    <Card
      color={"lightPallette.background.main"}
      position="absolute"
      w="100%"
      height="100%"
      bg="rgba(0,0,0,0.5)"
    >
      <Box width="75%" mx="auto" mt="100px" height="75%">
        <Text fontSize="22px">(Probably)#1 app for gym enthusiasts</Text>
        <Heading size="xl" lineHeight="50px" mt="20px">
          Let's start your journey with{" "}
          <Text>
            <Text
              display="inline"
              fontWeight="800"
              color={useColorModeValue(
                "lightPallette.primary.600",
                "lightPallette.primary.300"
              )}
            >
              Workout
            </Text>
            Buddy
          </Text>
        </Heading>
        <Text>
          The world’s largest hardcore training site. It is specifically
          designed for more advanced fitness enthusiasts.
        </Text>

        <Button
          mt="50px"
          colorScheme={useColorModeValue(
            "lightPallette.primary",
            "darkPallette.primary"
          )}
        >
          <Link to="/register">Get Started</Link>
        </Button>
      </Box>
    </Card>
  );
};

export default InnerText;
