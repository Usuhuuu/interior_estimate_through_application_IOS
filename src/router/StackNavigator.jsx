// StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../authContainer/signup";
import ProSignup from "../authContainer/proSignup";

const Stack = createStackNavigator();

const authStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="signUp" component={Signup} />
    <Stack.Screen name="proSignUp" component={ProSignup} />
    <Stack.Screen name="login" component={Login} />
  </Stack.Navigator>
);

export default authStackScreen;
