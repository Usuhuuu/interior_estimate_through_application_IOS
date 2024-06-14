import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, useRef } from "react";
import LoginPage from "../authContainer/login";
import UserScreen from "../authContainer/USER/userScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";
import Signup from "../authContainer/signup";
import ProSignup from "../authContainer/proSignup";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  const [authIsExist, setAuthIsExist] = useState(false);
  const authIsExistRef = useRef(false);
  const checkAuthenticated = async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem("Tokens");
      if (isAuthenticated === null || isAuthenticated === undefined) {
        Alert.alert("로그인 하세요");
        return null;
      } else {
        authIsExistRef.current = true;
        console.log(authIsExistRef);
        return JSON.parse(isAuthenticated);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const checkAuthAndRefresh = async () => {
    const Token = await checkAuthenticated();
    if (Token === null) {
      Alert.alert("로그인 하세요");
    } else {
      const header_config = {
        refresh: Token.refreshToken,
        Authorization: `Bearer ${Token.accessToken}`,
      };
      try {
        const res = await axios.post(
          `${urlApi}/auth/refresh`,
          {
            validateStatus: function (status) {
              return status < 500;
            },
          },
          {
            headers: header_config,
          }
        );
        if (res.status === 401 || res.status === 403) {
          authIsExistRef.current = false;
        } else {
          if (res.data) {
            AsyncStorage.setItem(
              "Tokens",
              JSON.stringify({
                ...Token,
                accessToken: res.data.accessToken,
              })
            );
            authIsExistRef.current = true;
          } else {
            console.log("Unexpected response structure:", res.data);
          }
        }
      } catch (error) {
        console.log("Errors", error);
      }
    }
  };
  useEffect(() => {
    checkAuthAndRefresh();
    authIsExistRef.current;
  }, [authIsExistRef]);
  const onStateChange = (state) => {
    console.log("Navigation State:", state);
  };
  return (
    <Stack.Navigator onStateChange={onStateChange}>
      {console.log(
        "Rendering with authIsExistRef.current:",
        authIsExistRef.current
      )}
      {authIsExistRef.current ? (
        <Stack.Screen
          name="마이페이즈"
          options={{ headerShown: false }}
          component={UserScreen}
        />
      ) : (
        <>
          <Stack.Screen name="로그인" component={LoginPage} />
          <Stack.Screen name="회원가입" component={Signup} />
          <Stack.Screen name="proSingUp" component={ProSignup} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default AuthNavigator;
