import React, { useRef, useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const localhost = "localhost";

const Sewer = () => {
  const [questionSets, setQuestionSets] = useState([
    [
      {
        id: 11.1,
        text: "건물 종류는 어떻게 되나요?",
        options: [
          "단독주택",
          "아파트",
          "빌라",
          "다가구",
          "상가",
          "공장",
          "기타",
        ],
      },
    ],
    [
      {
        id: 11.2,
        text: "공간의 상황을 선택해주세요.",
        options: ["현재 비어 있음", "시공 시 공실 예정", "사용 중"],
      },
      {
        id: 11.3,
        text: "시공 면적",
        options: [
          "10평 이하",
          "10평 - 20평",
          "30평 - 40평",
          "40평 - 50평",
          "해당 없음",
        ],
      },
      {
        id: 5.5,
        text: "시공 원하는 날짜",
        options: [
          "협의 가능해요",
          "가능한 빨리 진행하고 싶습니다.",
          "일주일 이내로 진행하고 싶습니다.",
          "원하는 날짜가 있습니다.",
          "기타",
        ],
      },
      {
        id: 10.2,
        text: "주소를 선택해 주세요",
        options: [
          {
            label: "서울",
            districts: [
              "강남구",
              "강동구",
              "강북구",
              "강서구",
              "관악구",
              "광진구",
              "구로구",
              "금천구",
              "노원구",
              "도봉구",
              "동대문구",
              "동작구",
              "마포구",
              "서대문구",
              "서초구",
              "성동구",
              "성북구",
              "송파구",
              "양천구",
              "영등포구",
              "용산구",
              "은평구",
              "종로구",
              "중구",
              "중랑구",
            ],
          },
          {
            label: "인천",
            districts: [
              "강화군",
              "계양구",
              "남동구",
              "동구",
              "미추홀구",
              "부평구",
              "서구",
              "연수구",
              "옹진군",
            ],
          },
          {
            label: "경기",
            districts: [
              "가평군",
              "고양시",
              "과천시",
              "광명시",
              "광주시",
              "구리시",
              "군포시",
              "김포시",
              "남양주시",
              "동두천시",
              "부천시",
              "성남시",
              "수원시",
              "시흥시",
              "안산시",
              "안성시",
              "안양시",
              "양주시",
              "양평군",
              "여주시",
              "연천군",
              "오산시",
              "용인시",
              "의왕시",
              "의정부시",
              "이천시",
              "파주시",
              "평택시",
              "포천시",
              "하남시",
              "화성시",
            ],
          },
        ],
      },
      { id: 5.6, text: "공사 소개자", options: [] },
      { id: 5.7, text: "견적 요청하겠습니까?", options: ["네", "아니요"] },
    ],
  ]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedSpecific, setSelectedSpecific] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [enteredText, setEnteredText] = useState("");
  const [lastQuestion, setLastQuestion] = useState(false);
  const [selectedCitys, setSelectedCitys] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [renderedDistricts, setRenderedDistricts] = useState(false);
  const [finalAddress, setFinalAddress] = useState("");
  const [districtUpdated, setDistrictUpdated] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(false);
  const generateInitialValues = (sets) => {
    const initialValues = {};
    sets.forEach((set) => {
      set.forEach((question) => {
        initialValues[question.id] = "";
      });
    });
    return initialValues;
  };
  const generateValidationSchema = (sets) => {
    const validationSchema = sets.reduce((schema, set) => {
      set.forEach((question) => {
        schema[question.id] = Yup.string().required("This field is required");
      });
      return schema;
    }, {});
    return Yup.object().shape(validationSchema);
  };
  const handleTextChange = (e) => {
    setEnteredText(e.target.value);
  };
  const handleSubmit = async ({ setSubmitting }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        try {
          const isConfirmed = window.confirm("견적 받기 위해서 로그인하세요!");
          if (isConfirmed) {
            const origin = window.location.origin;
            const authPopup = window.open(
              `${origin}/auth/login`,
              "_blank",
              "width=600, height=600"
            );
            const expirationTimeInMinutes = 5;
            const expirationTime = new Date(
              new Date().getTime() + expirationTimeInMinutes * 60000
            );
            Cookie.set("surveyData", JSON.stringify({ answeredQuestions }), {
              expires: expirationTime,
              path: "/interior",
              domain: `${localhost}`,
              sameSite: "Lax",
            });
            if (!authPopup) {
              alert("팝업 차단을 꺼주세요!");
              Cookie.remove("surveyData", {
                path: "/interior",
                domain: `${localhost}`,
                sameSite: "Lax",
              });
              return;
            }
            const popupClosedPromise = new Promise((resolve) => {
              const pollPopup = setInterval(() => {
                const newAuthToken = localStorage.getItem("authToken");
                if (authPopup.closed || newAuthToken) {
                  clearInterval(pollPopup);
                  resolve();
                  if (newAuthToken) {
                    authPopup.close();
                    window.location.reload();
                  } else {
                    alert("Authentication Failed. Please try again");
                  }
                }
              }, 1000);
            });
            await popupClosedPromise;
          } else {
            Cookie.remove("surveyData", {
              path: "/interior",
              domain: `${localhost}`,
              sameSite: "Lax",
            });
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Error opening authentication pop-up:", error);
          alert("Failed to open authentication pop-up. Please try again.");
        }
      } else {
        try {
          const response = await axios.post(
            `${urlApi}/auth/interior`,
            { answeredQuestions, estimateType: "방수" },
            {
              headers: {
                Authorization: authToken,
              },
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            alert("견적요청이 성공하셨습니다.");
            Cookie.remove("surveyData", {
              path: "/interior",
              domain: `${localhost}`,
              sameSite: "Lax",
            });
            // if (selectedOption === 'no') {
            //   Cookie.remove('surveyData', {
            //     path: '/interior',
            //     domain: `${localhost}`,
            //     sameSite: 'Lax'
            //   });
            //   window.location.href = '/';
            //   return;
            // }
          } else {
            const errorMessage = `Unexpected response status: ${response.status}`;
            alert(errorMessage);
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          // Add additional logging or error handling here
        } finally {
          setSubmitting(false);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const loadFromCookie = () => {
    const savedDataString = Cookie.get("surveyData", {
      path: "/interior",
      domain: localhost,
      sameSite: "Lax",
    });
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      setAnsweredQuestions(savedData.answeredQuestions);
      const lastSetIndex = questionSets.length - 1;
      const lastQuestionIndex = questionSets[lastSetIndex].length - 1;
      setCurrentSetIndex(lastSetIndex);
      setCurrentQuestionIndex(lastQuestionIndex);
      setLastQuestion(true);
    }
    Cookie.remove("surveyData", {
      path: "/interior",
      domain: `${localhost}`,
      sameSite: "Lax",
    });
  };
  useEffect(() => {
    loadFromCookie();
  }, []);
  const handleNextQuestion = () => {
    const currentQuestionSet = questionSets[currentSetIndex];
    const currentQuestion = currentQuestionSet[currentQuestionIndex];
    const selectedOption = formValues[currentQuestion.id];
    setAnsweredQuestions([
      ...answeredQuestions,
      { questionId: currentQuestion.id, selectedOption },
    ]);
    console.log("answeredQuestions: ", answeredQuestions);
    if (currentQuestionSet === questionSets[0]) {
      // Check the answer to the first question and move to the corresponding set
      if (selectedOption === "주거 공간 인테리어") {
        setCurrentSetIndex(1);
        setIsOptionSelected(false);
      } else if (selectedOption === "상업공간 인테리어") {
        setCurrentSetIndex(2);
        setIsOptionSelected(false);
      }
    } else if (currentQuestionIndex < currentQuestionSet.length - 1) {
      // Move to the next question in the current set
      setIsOptionSelected(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSetIndex < questionSets.length - 1) {
      // Move to the next set of questions
      setCurrentSetIndex(currentSetIndex + 1);
      setCurrentQuestionIndex(0);
      setIsOptionSelected(false);
    } else {
      console.log("End of questions");
      setLastQuestion(true);
    }
    setShowPreview(false);
    setFormValues(generateInitialValues(questionSets));
  };
  const questionIdRef = useRef(null);
  const handleRadioChange = (questionId, option) => {
    setIsOptionSelected(true);
    setSelectedSpecific(false);
    questionIdRef.current = questionId;
    const isCityQuestion = questionId === 10.2;
    const isQuestionAnswered = answeredQuestions.some(
      (q) => String(q.questionId) === String(questionId)
    );
    if (isQuestionAnswered) {
      if (option === "기타" || option === "해당 없음") {
        setSelectedSpecific(true);
        setAnsweredQuestions((prevAnswers) => {
          const updatedAnswers = prevAnswers.map((answer) => {
            if (answer[questionId] !== undefined) {
              return {
                [questionId]:
                  option === "기타" || option === "해당 없음"
                    ? "NEW" + enteredText.substring(0, 255)
                    : "NEW" + option,
              };
            }
            return answer;
          });
          return updatedAnswers;
        });
      } else {
        setAnsweredQuestions((prevAnswers) => [
          ...prevAnswers,
          { [questionId]: `NEW` + option },
        ]);
      }
    } else if (isCityQuestion) {
      const chosenCity = formValues[10.2] && formValues[10.2].label;
      if (chosenCity) {
        handleCitySelection();
        return;
      } else if (option === "기타" || option === "해당 없음") {
        setSelectedSpecific(true);
        setUpdatedValue(true);
      }
    }
    if (option === "기타" || option === "해당 없음") {
      setSelectedSpecific(true);
      setUpdatedValue(true);
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [questionId]: option || "",
    }));
  };
  useEffect(() => {
    if (updatedValue) {
      const limitedText = enteredText.substring(0, 255);
      setAnsweredQuestions((prevAnswers) => {
        const filteredAnswers = prevAnswers.filter(
          (item) => item[questionIdRef.current] === undefined
        );
        const updatedItem = { [questionIdRef.current]: "NEW" + limitedText };
        return [...filteredAnswers, updatedItem];
      });
    }
  }, [updatedValue, enteredText]);
  const handleCitySelection = async (selectedCityOption) => {
    if (selectedCityOption) {
      const chosenCity = selectedCityOption.value;
      setSelectedCitys(chosenCity);
      const cityOption = questionSets[currentSetIndex][
        currentQuestionIndex
      ].options.find((opt) => opt.label === chosenCity);
      if (cityOption) {
        const renderDistricts = cityOption.districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ));
        setRenderedDistricts(renderDistricts);
      } else {
        console.error(`City option not found for ${chosenCity}`);
        setRenderedDistricts(null);
      }
    } else {
      setRenderedDistricts(null);
      setSelectedDistricts("");
    }
  };
  useEffect(() => {
    if (selectedDistricts && !districtUpdated) {
      setDistrictUpdated(true);
      const generatedAddress = selectedCitys + " " + selectedDistricts;
      setFinalAddress(generatedAddress);
      setFormValues((prevValues) => ({
        ...prevValues,
        10.2: generatedAddress,
      }));
    }
  }, [selectedDistricts, districtUpdated]);
  useEffect(
    () => {
      handleCitySelection();
    },
    [formValues, currentSetIndex, currentQuestionIndex],
    [finalAddress],
    [isOptionSelected]
  );
  const handlePreview = () => {
    if (currentSetIndex === 0 && currentQuestionIndex === 0) {
      setCurrentSetIndex(0);
      return;
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSetIndex === 2) {
      const previousSetIndex = currentSetIndex - 2;
      setCurrentSetIndex(previousSetIndex);
      setCurrentQuestionIndex(questionSets[previousSetIndex].length - 1);
      console.log(currentQuestionIndex);
    } else if (currentSetIndex > 0) {
      const previousSetIndex = currentSetIndex - 1;
      setCurrentSetIndex(previousSetIndex);
      setCurrentQuestionIndex(questionSets[previousSetIndex].length - 1);
    }
    setShowPreview(false);
    setFormValues(generateInitialValues(questionSets));
    setSelectedSpecific(false);
  };
  const renderSelectComponents = () => {
    const question = questionSets[currentSetIndex][currentQuestionIndex];
    if (question.id === 10.2) {
      return (
        <View>
          <Picker
            selectedValue={selectedCitys}
            onValueChange={(itemValue) => handleCitySelection(itemValue)}
          >
            {cityOptions.map((cityOption, index) => (
              <Picker.Item
                key={index}
                label={cityOption.label || option}
                value={cityOption.value || option}
              />
            ))}
          </Picker>
          {renderedDistricts && (
            <Picker
              selectedValue={selectedDistricts}
              onValueChange={(itemValue) => {
                setSelectedDistricts(itemValue);
                setIsOptionSelected(true);
              }}
            >
              {renderedDistricts.map((districtOption, index) => (
                <Picker.Item
                  key={index}
                  label={districtOption.label || districtOption}
                  value={districtOption.value || districtOption}
                />
              ))}
            </Picker>
          )}
        </View>
      );
    }
    return (
      <>
        {question.options.map((option, index) => (
          <View key={index} style={"optionContainers"}>
            <RadioButton.Item
              label={option.label || option}
              value={option.label || option}
              status={
                formValues[question.id] === (option.label || option)
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleRadioChange(question.id, option)}
            />
            <Text style={radioLabel}>{option.label || option}</Text>

            {selectedSpecific &&
              (option === "기타" || option === "해당 없음") && (
                <TextInput
                  style={additionalInfoInput}
                  name={`additionalInfo-${question.id}`}
                  placeholder="Enter additional information"
                  onChangeText={handleTextChange}
                />
              )}
          </View>
        ))}
      </>
    );
  };
  return (
    <>
      <View className="formContainer">
        <Formik
          initialValues={{
            ...generateInitialValues(questionSets),
            city: "",
            district: "",
          }}
          validationSchema={generateValidationSchema(questionSets)}
          onSubmit={handleSubmit}
        >
          <Form>
            {currentSetIndex < questionSets.length && !showPreview && (
              <View style={"estimateMain"}>
                <View style={"allContainers"}>
                  <Text>
                    {questionSets[currentSetIndex][currentQuestionIndex].text}
                  </Text>
                  {renderSelectComponents()}
                </View>
                <ErrorMessage
                  name={questionSets[currentSetIndex][currentQuestionIndex].id}
                  component={Text}
                />
                <View style={btns}>
                  <Button
                    title="이전"
                    style={submitBtns}
                    onPress={handlePreview}
                    disabled={
                      currentSetIndex === 0 && currentQuestionIndex === 0
                    }
                  >
                    이전
                  </Button>
                  {!lastQuestion ? (
                    <Button
                      title="다음"
                      style={nextBtns}
                      onPress={handleNextQuestion}
                      disabled={!isOptionSelected}
                    >
                      다음
                    </Button>
                  ) : (
                    <Button
                      title="제출하기"
                      style={nextBtns}
                      type="button"
                      onPress={handleSubmit}
                    >
                      제출하기
                    </Button>
                  )}
                </View>
              </View>
            )}
          </Form>
        </Formik>
      </View>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Sewer;
