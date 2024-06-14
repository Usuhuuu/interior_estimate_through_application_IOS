// TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../publicContainer/home";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./authNavigator";
import Icon from "react-native-vector-icons/FontAwesome";
import IconDifferent from "react-native-vector-icons/Ionicons";
import UserScreen from "../authContainer/USER/userScreen";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        options={{
          headerShown: false,
          tabBarIcon: ({}) => (
            <>
              <Icon name="home" size={30} color={"#517fa4"} />
            </>
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="마이페이즈"
        options={{
          headerShown: false,
          tabBarIcon: ({}) => (
            <>
              <IconDifferent name="person" size={30} color={"#517fa4"} />
            </>
          ),
        }}
        // component={AuthNavigator}
        component={UserScreen}
      />
      <Tab.Screen
        name="전체메뉴"
        options={{
          headerShown: false,
          tabBarIcon: ({}) => (
            <>
              <IconDifferent name="menu" size={30} color={"#517fa4"} />
            </>
          ),
        }}
        component={DrawerNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
