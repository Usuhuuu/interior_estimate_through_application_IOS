import React, { useRef, useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import mainStyle from "../../../design/mainstyle";
import axios from "axios";
import Footer from "../footer";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";
const localhost = "localhost";

const Interior = () => {
  const [questionSets, setQuestionSets] = useState([
    [
      {
        id: 1,
        text: "어떤 인테리어 원하십니까?",
        options: ["주거 공간 인테리어", "상업공간 인테리어"],
      },
    ],
    [
      {
        id: 10.1,
        text: "어떤 건물인지 선택해 주세요",
        options: ["아파트", "단독주택", "빌라", "오피스텔", "기타"],
      },
      {
        id: 2.2,
        text: "시공 일자",
        options: ["1개월 이내", "2개월 이내", "3개월 이내", "해당 없음"],
      },
      {
        id: 2.3,
        text: "형제 계약 상태",
        options: [
          "형재 입주 중",
          "계약 완료 및 공실 상태",
          "가계약 완료/계약 예정",
          "계약 전",
        ],
      },
      {
        id: 2.4,
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
        id: 2.5,
        text: "바닥 시공 원하십니까?",
        options: ["해당 없음", "강마루", "강화마루", "장판", "대리석", "기타"],
      },
      {
        id: 2.6,
        text: "주방시공 원하십니까?",
        options: [
          "해당 없음",
          "전체 교체(사제)",
          "전체 교체(브랜드)",
          "필름만 시공",
          "타일만 시공",
          "기타",
        ],
      },
      {
        id: 2.7,
        text: "욕실시공 원하십니까?",
        options: [
          "해당 없음",
          "전체 교체",
          "도기만 교체",
          "타일만 교체",
          "기타",
        ],
      },
      {
        id: 2.8,
        text: "샷지기공 원하십니까?",
        options: ["해당 없음", "전체 교체", "부분 교체", "필름만 시공", "기타"],
      },
      {
        id: 2.9,
        text: "베란다 시공 원하십니까?",
        options: ["해당 없음", "거실 확장", "방 확장", "베란다 단올림", "기타"],
      },
      {
        id: 3.1,
        text: "방문 보수/교체 원하십니까?",
        options: ["해당 없음", "전체 교체", "부분 교체", "필름만 시공", "기타"],
      },
      {
        id: 3.2,
        text: "현관문 시공 원하십니까?",
        options: ["해당 없음", "신발장", "타일", "가벽", "중문", "기타"],
      },
      {
        id: 3.3,
        text: "조명 시공 원하십니까?",
        options: [
          "해당 없음",
          "전체 교체",
          "등/스위치만 교체",
          "전기만 시공",
          "기타",
        ],
      },
      {
        id: 10.4,
        text: "공사는 언제부터 가능하신가요?",
        options: [
          "협의 가능해요",
          "가능한 빨리 진행하고 싶습니다",
          "일주일 이내로 진행하고 싶습니다",
          "원하는 날짜가 있습니다",
          "기타",
        ],
      },
      {
        id: 10.5,
        text: "현장 방문할 날짜",
        options: [
          "협의 가능해요",
          "가능한 빨리 진행하고 싶습니다",
          "일주일 이내로 진행하고 싶습니다",
          "원하는 날짜가 있습니다",
          "기타",
        ],
      },
      {
        id: 3.5,
        text: "인테리어 예상 금액",
        options: [
          "상담 후 결정",
          "1000만 원 미만",
          "1000만 - 2000만 원",
          "2000만 - 3000만 원",
          "3000만 - 4000만 원",
          "4000만 - 5000만 원",
          "5000만 원 이상",
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
      //{id:3.6, text:"공사 소개자", options:[]},
      { id: 3.7, text: "견적 요청하겠습니까?", options: ["네", "아니요"] },
    ],
    [
      {
        id: 10.6,
        text: "어떤 건물인지 선택해 주세요",
        options: [
          "상가",
          "사무실",
          "식당",
          "학원",
          "병원",
          "숙박시설",
          "카페",
          "기타",
        ],
      },

      {
        id: 4.2,
        text: "시공 일자",
        options: ["1개월 이내", "2개월 이내", "3개월 이내", "해당 없음"],
      },
      {
        id: 4.4,
        text: "형제 계약 상태",
        options: [
          "형재 입주 중",
          "계약 완료 및 공실 상태",
          "가계약 완료/계약 예정",
          "계약 전",
        ],
      },
      {
        id: 10.4,
        text: "공사 현장 방문 실사 가능 날자?",
        options: [
          "협의 가능해요",
          "가능한 빨리 진행하고 싶습니다",
          "일주일 이내로 진행하고 싶습니다",
          "원하는 날짜가 있습니다",
          "기타",
        ],
      },
      {
        id: 4.6,
        text: "인테리어 예상 금액",
        options: [
          "상담 후 결정",
          "1000만 원 미만",
          "1000만 - 2000만 원",
          "2000만 - 3000만 원",
          "3000만 - 4000만 원",
          "4000만 - 5000만 원",
          "5000만 원 이상",
        ],
      },
      {
        id: 10.3,
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
      //{id:4.9, text:"공사 소개자", options:[]},
      { id: 5.0, text: "견적 요청하겠습니까?", options: ["네", "아니요"] },
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
  // const generateValidationSchema = (sets) => {
  //   const validationSchema = sets.reduce((schema, set) => {
  //     set.forEach((question) => {
  //       schema[question.id] = Yup.string().required('This field is required');
  //     });
  //     return schema;
  //   }, {});
  //   return Yup.object().shape(validationSchema);
  // };

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
            { answeredQuestions, estimateType: "인테리어" },
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
  // const loadFromCookie = () => {
  //   const savedDataString = Cookie.get('surveyData',{
  //     path: '/interior',
  //     domain: localhost,
  //     sameSite: 'Lax'
  //   });
  //   if (savedDataString) {
  //     const savedData = JSON.parse(savedDataString);
  //     setAnsweredQuestions(savedData.answeredQuestions)
  //     const lastSetIndex = questionSets.length - 1;
  //     const lastQuestionIndex = questionSets[lastSetIndex].length - 1;
  //     setCurrentSetIndex(lastSetIndex);
  //     setCurrentQuestionIndex(lastQuestionIndex);
  //     setLastQuestion(true)
  //   }
  //   Cookie.remove('surveyData', {
  //     path: '/interior',
  //     domain: `${localhost}`,
  //     sameSite: 'Lax'
  //   });
  // };
  // useEffect(() => {
  //   loadFromCookie();
  // }, []);
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
            {cityOption.map((cityOption, index) => (
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
          <View key={index} style={mainStyle.optionContainers}>
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
            {selectedSpecific &&
              (option === "기타" || option === "해당 없음") && (
                <TextInput
                  style={mainStyle.additionalInfoInput}
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
      <View style={mainStyle.formContainer}>
        {currentSetIndex < questionSets.length && !showPreview && (
          <View style={mainStyle.estimateMain}>
            <View style={mainStyle.allContainers}>
              <Text style={mainStyle.questionContainer}>
                {questionSets[currentSetIndex][currentQuestionIndex].text}
              </Text>
              {renderSelectComponents()}
            </View>
            {/* <ErrorMessage
              name={questionSets[currentSetIndex][currentQuestionIndex].id}
              component={Text}
            /> */}
            <View style={mainStyle.btns}>
              <Button
                title="이전"
                style={mainStyle.submitBtns}
                onPress={handlePreview}
                disabled={currentSetIndex === 0 && currentQuestionIndex === 0}
              >
                이전
              </Button>
              {!lastQuestion ? (
                <Button
                  title="다음"
                  titleStyle={{
                    color: "#0C59B6",
                  }}
                  onPress={handleNextQuestion}
                  disabled={!isOptionSelected}
                >
                  다음
                </Button>
              ) : (
                <Button
                  title="제출하기"
                  style={mainStyle.nextBtns}
                  type="button"
                  onPress={handleSubmit}
                >
                  제출하기
                </Button>
              )}
            </View>
          </View>
        )}
      </View>
      <View>
        <Footer />
      </View>
    </>
  );
};
export default Interior;
