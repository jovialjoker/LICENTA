import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeStackNavigator from "./src/stack-navigators/HomeStackNavigator";
import AuthScreen from "./src/screens/User/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import ChangeSplitScreen from "./src/screens/Home/ChangeCurrentSplit/ChangeSplitScreen";

LogBox.ignoreAllLogs();
const App = () => {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const getValues = async () => {
      let currentUser = await AsyncStorage.getItem("currentUser");
      setIsLoggedIn(!!JSON.parse(currentUser));
    };
    getValues();
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
            })}
            initialRouteName={isLoggedIn ? "HomeStack" : "Login"}
          >
            <Stack.Screen name="Login" component={AuthScreen} />
            <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
            <Stack.Screen name="ChangeSplit" component={ChangeSplitScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
