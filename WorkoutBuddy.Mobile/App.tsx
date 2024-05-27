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
import SelectWorkoutScreen from "./src/screens/Workout/SelectWorkout/SelectWorkoutScreen";
import AddProgressScreen from "./src/screens/Workout/AddProgress/AddProgressScreen";
import ChooseActionScreen from "./src/screens/Workout/ChooseAction/ChooseActionScreen";
import env from "./src/utils/constants/env";
import ChangeGoalsScreen from "./src/screens/Home/ChangeGoals/ChangeGoalsScreen";

LogBox.ignoreAllLogs();
const App = () => {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const getValues = async () => {
      let ngrokURL = await AsyncStorage.getItem("ngrokURL");
      if (ngrokURL == env.NGROK_URL) {
        let currentUser = await AsyncStorage.getItem("currentUser");
        setIsLoggedIn(!!JSON.parse(currentUser));
      } else {
        await AsyncStorage.setItem("ngrokURL", env.NGROK_URL);
        await AsyncStorage.setItem("currentUser", "{}");
        setIsLoggedIn(false);
      }
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
            <Stack.Screen
              name="ChangeSplit"
              component={ChangeSplitScreen}
              options={{ headerShown: true, title: "Change current split" }}
            />
            <Stack.Screen
              name="SelectWorkout"
              component={SelectWorkoutScreen}
              options={{ headerShown: true, title: "Select a workout" }}
            />
            <Stack.Screen
              name="ChooseAction"
              component={ChooseActionScreen}
              options={{ headerShown: true, title: "Choose action" }}
            />
            <Stack.Screen
              name="AddProgress"
              component={AddProgressScreen}
              options={{ headerShown: true, title: "Add progress" }}
            />
            <Stack.Screen
              name="ChangeGoals"
              component={ChangeGoalsScreen}
              options={{ headerShown: true, title: "Change goals" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
