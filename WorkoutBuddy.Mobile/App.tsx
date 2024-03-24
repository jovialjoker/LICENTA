import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeStackNavigator from "./src/stack-navigators/HomeStackNavigator";
import AuthScreen from "./src/screens/User/AuthScreen";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
            })}
          >
            <Stack.Screen name="Login" component={AuthScreen} />
            <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
