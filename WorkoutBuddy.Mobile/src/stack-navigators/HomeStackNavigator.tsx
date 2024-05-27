import React, { useEffect } from "react";
import HomeScreen from "../screens/Home/HomeScreen";
import MenuScreen from "../screens/Menu/MenuScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HamburgerIcon } from "native-base";
import HomeSvg from "../svgComponents/HomeSvg";

const HomeStackNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <HomeSvg />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <HamburgerIcon name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStackNavigator;
