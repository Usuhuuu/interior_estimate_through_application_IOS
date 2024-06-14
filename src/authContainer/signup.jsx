import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    agree_terms: false,
    agree_privacy: false,
    is_adult: false,
    role: "user",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [verificationNumber, setVerificationNumber] = useState("");
  const [timer, setTimer] = useState(600);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(false);
  const [sendSMSButtonDisabled, setSendSMSButtonDisabled] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);

  const handleChange = (name, value) => {
    if (name === "check-all") {
      const isChecked = !formData.agree_terms; // Toggle the value
      setFormData({
        ...formData,
        agree_terms: isChecked,
        agree_privacy: isChecked,
        is_adult: isChecked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    // Clear the interval when the timer reaches 0
    setTimeout(() => {
      clearInterval(intervalId);
    }, timer * 1000);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      Alert.alert("Error", "비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      if (verificationCompleted) {
        console.log("formData", formData);
        const response = await axios.post(`${urlApi}/auth/signup`, formData, {
          validateStatus: function (status) {
            // Return true if the status is less than 500
            return status < 500;
          },
        });
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        if (response.status === 200) {
          setResponseMessage(response.data.message);
          console.log("200", responseMessage);
          Alert.alert(responseMessage);
          navigation.goBack();
        } else if (response.status === 409) {
          Alert.alert(
            "Error",
            "이미 가입된 사용자입니다. 다른 이메일을 사용하세요."
          );
        } else {
          Alert.alert("Error", "서버에 문제가 있습니다. 다시 시도해 주세요.");
        }
      } else {
        Alert.alert("Error", "핸드폰 인증해 주세요");
      }
    } catch (error) {
      console.error("Error in signup:", error);
      setResponseMessage(error.message);
      Alert.alert("Error", "서버에 문제가 있습니다. 고객센터에 연락하세요");
    }
  };
  const handleSendSMS = async () => {
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/sendSMS`, {
        phoneNumber: formData.phoneNumber,
      });
      if (response.data.success) {
        setResponseMessage("");
        setTimer(600);
        startTimer();
        setShowVerificationInput(true);
      } else {
        Alert.alert("Error", "인증번호 보내지 못했습니다. 다시 시동하세요");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      Alert.alert("Error", "인증번호 보내지 못했습니다. 다시 시동하세요");
    }
  };
  const verifySMSCode = async () => {
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/verifySMS`, {
        phoneNumber: formData.phoneNumber,
        verificationNumber,
      });
      if (response.data.success) {
        // Verification successful, proceed with user registration
        setPhoneNumberDisabled(true);
        setSendSMSButtonDisabled(true);
        setVerificationCompleted(true);
        Alert.alert("성공", "인증완료");
        return true;
      } else {
        // Verification failed
        setResponseMessage("Invalid verification code");
        Alert.alert("Error", responseMessage);
        return false;
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Failed to verify SMS code. Please try again.");
      Alert.alert("Error", responseMessage);
      return false;
    }
  };
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={signupStyle.signupContainer}>
          <View style={signupStyle.container}>
            <View style={signupStyle.signupForm} onSubmit={handleSubmit}>
              <View style={signupStyle.formGroup}>
                <TextInput
                  placeholder="이름"
                  value={formData.name}
                  onChangeText={(text) => {
                    handleChange("name", text);
                  }}
                  placeholderTextColor={"grey"}
                  required
                />
              </View>
              <View style={signupStyle.formGroup}>
                <TextInput
                  placeholder="핸드폰 번호"
                  value={formData.phoneNumber}
                  required
                  placeholderTextColor={"grey"}
                  onChangeText={(text) => {
                    handleChange("phoneNumber", text);
                  }}
                />
              </View>
              {!showVerificationInput ? (
                <View style={signupStyle.phoneNumberFirs}>
                  <TouchableOpacity
                    style={signupStyle.phoneNumberButtonFirst}
                    onPress={handleSendSMS}
                  >
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                      인증하기
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={signupStyle.formGroup}>
                    <TextInput
                      value={verificationNumber}
                      onChangeText={(text) => setVerificationNumber(text)}
                      required
                      disabled={phoneNumberDisabled}
                      placeholder="인증번호 입력하기"
                      placeholderTextColor={"grey"}
                    />
                  </View>
                  <View style={signupStyle.phoneNumberButtonFirst}>
                    <Button
                      title={verificationCompleted ? "인증완료" : "인증하기"}
                      onPress={verifySMSCode}
                      disabled={sendSMSButtonDisabled}
                    />
                  </View>
                </>
              )}
              <View style={signupStyle.formGroup}>
                <TextInput
                  placeholder="이메일"
                  value={formData.email}
                  onChangeText={(text) => {
                    handleChange("email", text);
                  }}
                  placeholderTextColor={"grey"}
                />
              </View>
              <View style={signupStyle.formGroup}>
                <TextInput
                  placeholder="비밀번호"
                  secureTextEntry={true}
                  blurOnSubmit={true}
                  clearTextOnFocus={true}
                  value={formData.password}
                  placeholderTextColor={"grey"}
                  autoComplete="current-password"
                  onChangeText={(text) => {
                    handleChange("password", text);
                  }}
                />
              </View>
              <View style={signupStyle.formGroup}>
                <TextInput
                  secureTextEntry={true}
                  blurOnSubmit={true}
                  clearTextOnFocus={true}
                  placeholderTextColor={"grey"}
                  placeholder="비밀번호 확인"
                  value={formData.confirm_password}
                  autoComplete="current-password"
                  required
                  onChangeText={(text) => {
                    handleChange("confirm_password", text);
                  }}
                />
              </View>
              <View style={signupStyle.checkbox}>
                <View style={signupStyle.allCheckbox}>
                  <Checkbox.Item
                    style={signupStyle.checkAll}
                    label="전체동의"
                    status={formData.agree_terms ? "checked" : "unchecked"}
                    onPress={() => handleChange("check-all")}
                  />
                </View>
                {/* <hr /> */}
                <View style={signupStyle.check2Container}>
                  <Checkbox.Item
                    style={signupStyle.check}
                    label="이용약관 동의 (필수)"
                    status={formData.agree_terms ? "checked" : "unchecked"}
                    onPress={() =>
                      handleChange("agree_terms", !formData.agree_terms)
                    }
                  />
                  <TouchableOpacity
                    style={signupStyle.보기}
                    onPress={() => navigateToScreen("")}
                  >
                    <Text style={{ color: "grey" }}>보기</Text>
                  </TouchableOpacity>
                </View>

                <View style={signupStyle.check2Container}>
                  <Checkbox.Item
                    style={signupStyle.check}
                    label="개인정보 수집 및 이용 동의 (필수)"
                    status={formData.agree_privacy ? "checked" : "unchecked"}
                    onPress={() =>
                      handleChange("agree_privacy", !formData.agree_privacy)
                    }
                  />
                  <TouchableOpacity
                    style={signupStyle.보기}
                    onPress={() => navigateToScreen("")}
                  >
                    <Text style={{ color: "grey" }}>보기</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Checkbox.Item
                    label="14세 이상입니다 (필수)"
                    style={signupStyle.check}
                    status={formData.is_adult ? "checked" : "unchecked"}
                    onPress={() => handleChange("is_adult", !formData.is_adult)}
                  />
                </View>
              </View>
              {/* <View style={signupStyle.formGroup}>
             Additional form groups can be added here if needed
            </View> */}
              <View>
                <TouchableOpacity
                  style={signupStyle.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: "#fff", fontSize: 20 }}>가입하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const signupStyle = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  formGroup: {
    borderWidth: 0.7,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  phoneNumberButtonFirst: {
    alignItems: "center",
    padding: 5,
    backgroundColor: "#3498db",
    marginHorizontal: 100,
    borderRadius: 4,
  },
  submitButton: {
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#3498db",
    borderRadius: 4,
  },
  checkbox: {
    margin: 10,
  },
  allCheckbox: {
    fontSize: 10,
  },
  check: {
    marginHorizontal: 15,
  },
  check2Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  보기: {
    marginLeft: "auto",
    position: "relative",
  },
  // Add other styles as needed
});
export default Signup;
