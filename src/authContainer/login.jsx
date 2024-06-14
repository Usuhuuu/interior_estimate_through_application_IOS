import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import KakaoLogin from "@react-native-seoul/kakao-login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";
const axiosConfig = {
  timeout: 5000, // Set a timeout (in milliseconds)
};
let ScreenHeight = Dimensions.get("window").height;
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [passwordHide, setPasswordHide] = useState(false);
  const handleSubmit = async () => {
    try {
      // console.log("Request Payload:", { email, password });
      setLoading(true);
      const response = await axios.post(
        `${urlApi}/auth/login`,
        { email, password, mobile: true },
        {
          ...axiosConfig,
          withCredentials: true,
        }
      );
      console.log("Request Details:", response.status);
      if (response.status === 200) {
        await AsyncStorage.setItem(
          "Tokens",
          JSON.stringify({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        // console.log("accessToken", response.data.accessToken);
        // console.log("RefreshToken", response.data.refreshToken);
        setLoading(false);
        Alert.alert("로그인이 했습니다.");
        navigateToScreen("홈");
      } else {
        setErrors("이메일이나 비밀번호가 틀렸습니다.");
        Alert.alert(errors);
        setLoading(false);
      }
    } catch (error) {
      console.error("Request failed:", error);
      Alert.alert("Request failed. Please check your network connection.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleKakaoLogin = async () => {
    try {
      const result = await KakaoLogin.login();
      console.log(result);
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleMail = (inputedText) => {
    setEmail(inputedText);
    console.log("mail", email);
  };
  const handlePassword = (inputedText) => {
    setPassword(inputedText);
  };
  const handlePasswordToggle = () => {
    if (!passwordHide) {
      setPasswordHide(true);
    } else {
      setPasswordHide(false);
    }
  };
  useEffect(() => {
    handlePasswordToggle();
  }, [passwordHide]);

  return (
    <ScrollView>
      {isLoading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            bottom: 0,
            width: "100%",
            height: ScreenHeight,
            backgroundColor: "#fff",
            zIndex: 1000,
            flex: 1,
          }}
        >
          <ActivityIndicator size={100} color={"#3498db"} />
          <Text style={{ fontSize: 25, color: "grey" }}>
            잠시만 기다려 주세요
          </Text>
        </View>
      ) : (
        <>
          <View style={loginStyle.loginFormContainer}>
            <View style={loginStyle.loginForm}>
              <View>
                {/* Username Input */}
                <TextInput
                  name="email"
                  required
                  placeholder="이메일"
                  value={email}
                  onChangeText={(text) => handleMail(text)}
                  style={loginStyle.formStyle}
                  autoFocus={true}
                  clearTextOnFocus={true}
                  placeholderTextColor={"grey"}
                />
                {/* Password Input */}
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <TextInput
                    secureTextEntry={passwordHide ? true : false}
                    placeholder="비밀번호"
                    name="password"
                    required
                    value={password}
                    onChangeText={(text) => handlePassword(text)}
                    style={loginStyle.formStyle}
                    blurOnSubmit={true}
                    clearTextOnFocus={true}
                    placeholderTextColor={"grey"}
                  />
                  <TouchableOpacity
                    onPress={handlePasswordToggle}
                    style={{ width: 10, position: "relative" }}
                  >
                    <Text style={{}}>비밀번호 보기</Text>
                  </TouchableOpacity>
                </View>

                <View style={loginStyle.submitBTN}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text
                      style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}
                    >
                      이메일 로그인
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Forget Password and Sign-Up Links */}
                <View style={loginStyle.forgetPassword}>
                  <TouchableOpacity
                    onPress={() => navigateToScreen("비밀번호 찾기")}
                  >
                    <Text style={{ color: "#3498db" }}>비밀번호 찾기 |</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigateToScreen("회원가입")}
                  >
                    <Text style={{ color: "#3498db" }}> 회원가입</Text>
                  </TouchableOpacity>
                </View>
                <View style={loginStyle.authorityLogin}>
                  <View style={{ paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigateToScreen("naver")}>
                      <Image
                        source={require("../../assets/Photo/naverLogin.png")}
                        style={loginStyle.naverLogin}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={loginStyle.appleLogin}>
                    <TouchableOpacity onPress={() => navigateToScreen("apple")}>
                      <Text>
                        <Icon
                          name="apple1"
                          style={{ color: "#fff" }}
                          size={22}
                        />
                        <Text style={{ color: "#fff", fontSize: 19 }}>
                          Apple로 로그인
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingVertical: 10 }}>
                    <TouchableOpacity onPress={handleKakaoLogin}>
                      <Image
                        source={require("../../assets/Photo/kakaoLogin.png")}
                        style={loginStyle.kakaoLogin}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const loginStyle = StyleSheet.create({
  loginFormContainer: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  loginForm: {},
  formStyle: {
    borderWidth: 0.7,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  submitBTN: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 10,
    margin: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  forgetPassword: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 80,
    justifyContent: "center",
  },
  authorityLogin: {
    width: "100%",
    alignItems: "center",
    // marginHorizontal: 80,
  },
  naverLogin: {
    width: 240,
    height: 44,
    borderRadius: 4,
    paddingVertical: 5,
  },

  appleLogin: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 4,
    width: 240,
    height: 44,
    alignItems: "center",
    paddingVertical: 10,
  },
  kakaoLogin: {
    width: 240,
    height: 44,
    borderRadius: 4,
    paddingVertical: 5,
  },
  loadingStyles: {
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    width: "100%",
    height: ScreenHeight,
    backgroundColor: "#fff",
    zIndex: 1000,
    flex: 1,
  },
  loadingText: {
    fontSize: 25,
    color: "grey",
  },
});

export default LoginPage;
