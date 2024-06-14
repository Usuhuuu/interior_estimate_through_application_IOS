import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  ToggleBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const convertQuestionIdsToText = (questionIdsString) => {
  // Check if questionIdsString is a string
  if (typeof questionIdsString !== "string") {
    console.error("Invalid questionIdsString:", questionIdsString);
    return "Invalid questionIdsString";
  }
  const questionIds = questionIdsString.split(",").map((id) => id.trim());
  const questionTexts = questionIds.map(getQuestionTextById).filter(Boolean);
  return questionTexts.join(", ");
};
const getQuestionTextById = (questionId) => {
  for (const question of questionSets) {
    if (question.id === questionId || question.id.toString() === questionId) {
      return question.text;
    }
  }
  console.error("Question not found for ID:", questionId);
  return "Question not found";
};
const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const UserScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const checkAuth = async () => {
    try {
      const Tokens = await AsyncStorage.getItem("Tokens");
      if (authToken) {
        setIsAuthenticated(true);
        const response = await axios.post(
          `${urlApi}/auth/user`,
          { Tokens },
          {
            headers: {
              Authorization: `Bearer ${Tokens.accessToken}`,
              withCredentials: true,
            },
          }
        );
        setUserData(response.data)
          .then((response) => {
            console.log("recived Data:", response);
          })
          .catch((error) => {
            console.log("Error didnt recive Data:", error);
          });
      } else {
        setIsAuthenticated(false);
        Alert.alert("로그인하세요");
      }
    } catch (error) {
      console.log("Error", error);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <ScrollView>
      {isAuthenticated ? (
        <></>
      ) : (
        <>{/* {Alert.alert("로그인 된 사용자가 없습니다.")} */}</>
      )}
      <View style={userScreenStyle.userScreenContainer}>
        <ToggleBox
          label="회원정보"
          style={userScreenStyle.ToggleBoxContainer}
          arrow
        >
          <Text>이름: ={}</Text>
          <Text>이메일: {}</Text>
          <Text>핸드폰: {}</Text>
        </ToggleBox>
        <ToggleBox label="은행정보" style={userScreenStyle.ToggleBoxContainer}>
          <Text>이름: {}</Text>
          <Text>이름: {}</Text>
          <Text>은행정보: {}</Text>
        </ToggleBox>
        <ToggleBox label="견적 내용" style={userScreenStyle.ToggleBoxContainer}>
          <ToggleBox
            label="견적서"
            style={userScreenStyle.subToggleBoxContainer}
          >
            <Text>견적서: {}</Text>
          </ToggleBox>
          <ToggleBox
            label="진행중"
            style={userScreenStyle.subToggleBoxContainer}
          >
            <Text>이름: {}</Text>
            <Text>견적서: {}</Text>
          </ToggleBox>
        </ToggleBox>
      </View>
    </ScrollView>
  );
};

const userScreenStyle = StyleSheet.create({
  userScreenContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  ToggleBoxContainer: {
    width: "80%",
    height: "auto",
  },
  subToggleBoxContainer: {
    marginHorizontal: 5,
    gap: 5,
    borderWidth: 2,
    borderColor: "black",
  },
});

export default UserScreen;
