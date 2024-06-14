import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import DropDownPicker from "react-native-dropdown-picker";
import ModalDropdown from "react-native-modal-dropdown";
const ProSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    phoneNumber: "",
    profession: [],
    agree_terms: false,
    agree_privacy: false,
    is_adult: false,
  });
  const [clickedButton, setClickedButton] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationNumber, setVerificationNumber] = useState("");
  const [timer, setTimer] = useState(600);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(false);
  const [sendSMSButtonDisabled, setSendSMSButtonDisabled] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleGenderClick = (selectedGender) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
    setClickedButton(selectedGender);
  };

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
  const handleProSignup = async () => {
    if (formData.password !== formData.confirm_password) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      try {
        if (verificationCompleted && buttonClicked === true) {
          const registerResponse = await axios.post(
            `${urlApi}/auth/prosignup`,
            formData
          );
          setSuccessMessage(registerResponse.data.message);
          setErrorMessage("");
          window.location.href = "/auth/login";
        } else if (!verificationCompleted) {
          Alert.alert("핸드폰 인증해 주세요");
        } else if (buttonClicked === false) {
          Alert.alert("주소 입력하세요");
        } else {
          Alert.alert("서버 문제가 생겼습나다.");
        }
      } catch (error) {
        setSuccessMessage("");
        Alert.alert("Failed to sign up. Please try again. sda");
      }
    }
  };
  const getButtonColor = (buttonId) => {
    return clickedButton === buttonId ? "#755dc9" : "";
  };
  const verifySMSCode = async () => {
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/verifySMS`, {
        phoneNumber: formData.phoneNumber,
        verificationNumber,
      });
      console.log("Verification Response:", response.data);
      if (response.data.success) {
        setPhoneNumberDisabled(true);
        setSendSMSButtonDisabled(true);
        setVerificationCompleted(true);
        alert("인증완료");
        clearInterval(timer);
        return true;
      } else {
        alert("Invalid verification code");
        return false;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to verify SMS code. Please try again.");
      return false;
    }
  };
  const handleSendSMS = async () => {
    try {
      const response = await axios.post(`${urlApi}/auth/prosignup/sendSMS`, {
        phoneNumber: formData.phoneNumber,
      });
      if (response.data.success) {
        setTimer(600);
        startTimer();
        setShowVerificationInput(true);
      } else {
        Alert.alert("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      Alert.alert("Failed to send verification code. Please try again.");
    }
  };
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, timer * 1000);
  };
  const handleProfessionChange = (selectedValues) => {
    setFormData({
      ...formData,
      profession: selectedValues,
    });
  };
  const myData = [
    {
      name: "종합인테리어",
      value: "종합인테리어",
      childrens: [{ name: "종합인테리어", value: "종합인테리어" }],
    },
    {
      name: "부분인테리어",
      value: "부분인테리어",
      childrens: [
        { name: "주방", value: "주방" },
        { name: "도배", value: "도배" },
      ],
    },
    {
      name: "수리",
      value: "수리",
      childrens: [
        { name: "상수도", value: "상수도" },
        { name: "하수도", value: "하수도" },
        { name: "욕실", value: "욕실" },
      ],
    },
    {
      name: "청소",
      value: "청소",
      childrens: [
        { name: "청소", value: "청소" },
        { name: "에어컨", value: "에어컨" },
      ],
    },
    {
      name: "방수 누수",
      value: "방수 누수",
      childrens: [
        { name: "방수", value: "방수" },
        { name: "누수", value: "누수" },
      ],
    },
  ];
  const addresses = [
    {
      value: "서울",
      nested: [
        { value: "강남구" },
        { value: "강동구" },
        { value: "강북구" },
        { value: "강서구" },
        { value: "관악구" },
        { value: "광진구" },
        { value: "구로구" },
        { value: "금천구" },
        { value: "노원구" },
        { value: "도봉구" },
        { value: "동대문구" },
        { value: "동작구" },
        { value: "마포구" },
        { value: "서대문구" },
        { value: "서초구" },
        { value: "성동구" },
        { value: "성북구" },
        { value: "송파구" },
        { value: "양천구" },
        { value: "영등포구" },
        { value: "용산구" },
        { value: "은평구" },
        { value: "종로구" },
        { alue: "중구" },
        { value: "중랑구" },
      ],
    },
    {
      value: "인천",
      nested: [
        { value: "강화군" },
        { value: "계양구" },
        { value: "남동구" },
        { value: "동구" },
        { value: "미추홀구" },
        { value: "부평구" },
        { value: "서구" },
        { value: "연수구" },
        { value: "옹진군" },
      ],
    },
    {
      value: "경기",
      nested: [
        { value: "가평군" },
        { value: "고양시" },
        { value: "과천시" },
        { value: "광명시" },
        { value: "광주시" },
        { value: "구리시" },
        { value: "군포시" },
        { value: "김포시" },
        { value: "남양주시" },
        { value: "동두천시" },
        { value: "부천시" },
        { value: "성남시" },
        { value: "수원시" },
        { value: "시흥시" },
        { value: "안산시" },
        { value: "안성시" },
        { value: "안양시" },
        { value: "양주시" },
        { value: "양평군" },
        { value: "여주시" },
        { value: "연천군" },
        { value: "오산시" },
        { value: "용인시" },
        { value: "의왕시" },
        { value: "의정부시" },
        { value: "이천시" },
        { value: "파주시" },
        { value: "평택시" },
        { value: "포천시" },
        { value: "하남시" },
        { value: "화성시" },
      ],
    },
  ];
  const handleCityChange = (index, value) => {
    setSelectedCity(value);
  };
  const handleAreaChange = (index, value) => {
    setSelectedArea(value);
  };
  useEffect(
    () => {
      let lastAddress = selectedCity + " " + selectedArea;
      console.log("lastAddress", lastAddress);
      setFormData({
        ...formData,
        address: lastAddress,
      });
    },
    [selectedCity],
    [selectedArea]
  );

  if (!Array.isArray(addresses) || addresses.length === 0) {
    console.error("Invalid or empty addresses array.");
    return null;
  }
  const cityOptions = addresses.map((city) => city.value);
  const selectedCityData = addresses.find(
    (city) => city.value === selectedCity
  );
  const areaOptions = selectedCityData?.nested?.map((area) => area.value) || [];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={proSignUpStyle.proUserContainer}>
          <View style={proSignUpStyle.innerContainer}>
            <View id="sign-form" onSubmit={handleProSignup}>
              <View style={proSignUpStyle.formGroup}>
                <TextInput
                  placeholder="이름"
                  value={formData.name}
                  required
                  onChangeText={(text) => {
                    handleChange("name", text);
                  }}
                  placeholderTextColor={"grey"}
                />
              </View>
              <View style={proSignUpStyle.selectProfessions}>
                <SectionedMultiSelect
                  items={myData}
                  IconRenderer={Icon}
                  uniqueKey="value"
                  subKey="childrens"
                  showDropDowns={true}
                  selectedItems={formData.profession}
                  onSelectedItemsChange={(items) =>
                    handleProfessionChange(items[0])
                  }
                  colors={{
                    primary: "#48d22b",
                  }}
                  isMulti
                />
              </View>
              <View style={proSignUpStyle.genderContainer}>
                <View style={proSignUpStyle.gender}>
                  <TouchableOpacity
                    value="male"
                    onPress={() => handleGenderClick("male")}
                    style={{ backgroundColor: getButtonColor("male") }}
                    required
                  >
                    <Text>남성</Text>
                  </TouchableOpacity>
                </View>
                <View style={proSignUpStyle.gender}>
                  <TouchableOpacity
                    value="female"
                    onPress={() => handleGenderClick("female")}
                    style={{ backgroundColor: getButtonColor("female") }}
                    required
                  >
                    <Text>여성</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <View style={proSignUpStyle.formGroup}>
                <TextInput
                  placeholder="핸드폰 번호"
                  value={formData.phoneNumber}
                  onChangeText={(text) => {
                    handleChange("phoneNumber", text);
                  }}
                  placeholderTextColor={"grey"}
                  required
                />
              </View>
              {!showVerificationInput ? (
                <View style={proSignUpStyle.phoneNumberFirst}>
                  <TouchableOpacity
                    style={proSignUpStyle.phoneNumberButtonFirst}
                    onClick={handleSendSMS}
                  >
                    <Text>인증하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={proSignUpStyle.verificationNumberContainer}>
                  <TextInput
                    placeholder="인증번호 입력하기"
                    value={verificationNumber}
                    onChangeText={(text) => setVerificationNumber(text)}
                    required
                    placeholderTextColor={"grey"}
                    disabled={phoneNumberDisabled}
                  />
                  <Button
                    title={verificationCompleted ? "인증완료" : "인증하기"}
                    onPress={verifySMSCode}
                    disabled={sendSMSButtonDisabled}
                  />
                </View>
              )}
              <View style={"App"}>
                <View>
                  <View>
                    <ModalDropdown
                      options={cityOptions}
                      defaultIndex={0}
                      defaultValue="Select City"
                      animated={true}
                      isFullWidth={true}
                      onSelect={(index, value) =>
                        handleCityChange(index, value)
                      }
                      style={proSignUpStyle.downContainer}
                      textStyle={proSignUpStyle.dropdownText}
                    />
                    {selectedCity && (
                      <View>
                        <ModalDropdown
                          defaultIndex={0}
                          options={areaOptions}
                          defaultValue="Select Area"
                          onSelect={(index, value) =>
                            handleAreaChange(index, value)
                          }
                          animated={true}
                          isFullWidth={true}
                          style={proSignUpStyle.downContainer}
                          textStyle={proSignUpStyle.dropdownText}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View>
                  <Button
                    title={buttonClicked ? "주소 제출하기" : "완료했습니나."}
                  />
                </View>
              </View>
              <View style={proSignUpStyle.formGroup}>
                <TextInput
                  placeholder="이메일"
                  value={formData.email}
                  onChangeText={(text) => {
                    handleChange("email", text);
                  }}
                  placeholderTextColor={"grey"}
                  required
                />
              </View>
              <View style={proSignUpStyle.formGroup}>
                <TextInput
                  secureTextEntry={true}
                  placeholder="비밀번호"
                  value={formData.password}
                  onChangeText={(text) => {
                    handleChange("password", text);
                  }}
                  placeholderTextColor={"grey"}
                  required
                />
              </View>
              <View style={proSignUpStyle.formGroup}>
                <TextInput
                  secureTextEntry={true}
                  placeholder="비밀번호 확인"
                  onChangeText={(text) => {
                    handleChange("confirm_password", text);
                  }}
                  placeholderTextColor={"grey"}
                  required
                />
              </View>
              <View style={proSignUpStyle.checkbox}>
                <View style={proSignUpStyle.allCheckbox}>
                  <Checkbox.Item
                    style={proSignUpStyle.checkAll}
                    label="전체동의"
                    status={formData.agree_terms ? "checked" : "unchecked"}
                    onPress={() => handleChange("check-all")}
                  />
                </View>
                {/* <hr /> */}
                <View style={proSignUpStyle.check2Container}>
                  <Checkbox.Item
                    style={proSignUpStyle.check}
                    label="이용약관 동의 (필수)"
                    status={formData.agree_terms ? "checked" : "unchecked"}
                    onPress={() =>
                      handleChange("agree_terms", !formData.agree_terms)
                    }
                  />
                  <TouchableOpacity
                    style={proSignUpStyle.보기}
                    onPress={() => navigateToScreen("")}
                  >
                    <Text style={{ color: "grey" }}>보기</Text>
                  </TouchableOpacity>
                </View>

                <View style={proSignUpStyle.check2Container}>
                  <Checkbox.Item
                    style={proSignUpStyle.check}
                    label="개인정보 수집 및 이용 동의 (필수)"
                    status={formData.agree_privacy ? "checked" : "unchecked"}
                    onPress={() =>
                      handleChange("agree_privacy", !formData.agree_privacy)
                    }
                  />
                  <TouchableOpacity
                    style={proSignUpStyle.보기}
                    onPress={() => navigateToScreen("")}
                  >
                    <Text style={{ color: "grey" }}>보기</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Checkbox.Item
                    label="14세 이상입니다 (필수)"
                    style={proSignUpStyle.check}
                    status={formData.is_adult ? "checked" : "unchecked"}
                    onPress={() => handleChange("is_adult", !formData.is_adult)}
                  />
                </View>
              </View>
              <View style={"form-group"}>
                <TouchableOpacity
                  style={proSignUpStyle.submitButton}
                  onPress={handleProSignup}
                >
                  <Text style={{ color: "#fff", fontSize: 20 }}>가입하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const proSignUpStyle = StyleSheet.create({
  proUserContainer: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  innerContainer: {
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  selectProfessions: {
    borderWidth: 0.7,
    borderRadius: 4,
    margin: 10,
  },
  formGroup: {
    borderWidth: 0.7,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  genderContainer: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  gender: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    fontSize: 20,
    borderWidth: 0.7,
    borderRadius: 4,
  },
  phoneNumberFirst: {
    marginTop: 20,
  },
  phoneNumberButtonFirst: {
    alignItems: "center",
    padding: 5,
    backgroundColor: "#3498db",
    marginHorizontal: 100,
    borderRadius: 4,
  },
  verificationNumberContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#755dc9",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
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
  downContainer: {
    justifyContent: "center",
    borderWidth: 0.7,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  dropdownText: {
    fontSize: 13,
    color: "grey",
    left: 0,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default ProSignup;
