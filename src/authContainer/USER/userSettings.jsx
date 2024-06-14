// UserSettings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/user.css";
import {
  faUser,
  faBuildingColumns,
  faFileSignature,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import questionSets from "../publicContaner/QuestionData/interiorQeustion";
import { Text, View } from "react-native";

const convertQuestionIdsToText = (questionIdsString) => {
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

const UserSettings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("Accound Details");
  const [additionalData, setAdditionalData] = useState(null);
  const [activeQuote, setActiveQuote] = useState(null);
  const [showQuotes, setShowQuotes] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [activeToggle, setActiveToggle] = useState(null);
  const [acceptedData, setAcceptedData] = useState(null);
  const [isInvoThere, setInvoThere] = useState(false);

  let authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!authToken) {
          window.localStorage.href("/");
        }
        const response = await axios.post(
          `${urlApi}/auth/user`,
          {},
          {
            headers: {
              Authorization: authToken,
            },
            withCredentials: true,
          }
        );
        setUserData(response.data);
        // console.log(userData)
      } catch (error) {
        window.localStorage.href("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
    if (activeMenuItem) {
      handleAcceptEstimate();
      handleAcceptedEstimates();
    }
  }, [activeMenuItem]);

  const handleAcceptEstimate = async (estimateUniqueID) => {
    try {
      const response = await axios.post(
        `${urlApi}/auth/acceptEstimate`,
        { estimateUniqueID },
        {
          headers: {
            Authorization: authToken,
          },
          withCredentials: true,
        }
      );
      setAdditionalData((prevData) => {
        const updatedData = {
          ...prevData,
          ...response.data,
        };
        return updatedData;
      });
    } catch (error) {
      console.error("Error accepting estimate:", error);
    }
  };
  const handleAcceptedEstimates = async (estimateUniqueID) => {
    try {
      const response = await axios.post(
        `${urlApi}/auth/acceptedEstimate`,
        { estimateUniqueID },
        {
          headers: {
            Authorization: authToken,
          },
          withCredentials: true,
        }
      );
      setAcceptedData((prevData) => ({
        ...prevData,
        ...response.data,
      }));
      console.log("acceptedD", acceptedData);
    } catch (error) {
      console.error("Error accepting estimate:", error);
    }
  };
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setAdditionalData(null);
  };
  const handleToggle = (toggleName) => {
    if (activeToggle === toggleName) {
      return;
    }
    setActiveToggle(toggleName);
    switch (toggleName) {
      case "quotes":
        setShowQuotes((prevShowQuotes) => !prevShowQuotes);
        setShowProgress(false);
        break;
      case "progress":
        setShowProgress((prevShowProgress) => !prevShowProgress);
        setShowQuotes(false);
        break;
      default:
        break;
    }
  };
  const handlePairClick = (index) => {
    setActiveQuote(activeQuote === index ? null : index);
  };
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (errors) {
    return <Text>Error: {errors}</Text>;
  }
  if (!userData) {
    return <Text>User not found</Text>;
  }
  const 형대 = "10.1";
  const 주소 = "10.2";
  const 평수 = "10.3";
  const 공사예정일 = "10.4";
  const 방문회망일 = "10.5";

  const isEstimateMenuItem = activeMenuItem === "견적";
  const estimateData = additionalData || { estimate: [] };
  const acceptedEstimates = acceptedData || { acceptedEstimates: [] };
  return (
    <>
      <View className="col-md-9">
        {(() => {
          switch (userData.role) {
            case "user":
              return (
                <>
                  <View className="profile-content">
                    {/* Render content based on activeMenuItem */}
                    {activeMenuItem === "Accound Details" && (
                      <View className="userParameter">
                        <h2>Accound Details</h2>
                        <hr />
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Phone Number: {userData.phoneNumber}</p>
                      </View>
                    )}
                    {activeMenuItem === "Payment Details" && (
                      <View className="userParameter">
                        <h2>Payment Details</h2>
                        <hr />
                        <p>Bank</p>
                      </View>
                    )}
                    {isEstimateMenuItem && (
                      <ul className="userHiddenBarControler">
                        <View className="userParameter">
                          <h2 onClick={() => handleToggle("quotes")}>
                            견적 요청
                          </h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar">
                            {showQuotes &&
                            estimateData.estimate &&
                            estimateData.estimate.length > 0
                              ? estimateData.estimate
                                  .filter((estimate) => !estimate.accepted)
                                  .map((estimate, estimateIndex) => (
                                    <View
                                      key={estimate.estimateUniqueID}
                                      onClick={() =>
                                        handlePairClick(estimateIndex)
                                      }
                                    >
                                      <View className="userSmallInfo">
                                        <h3>
                                          견적서 {estimateIndex + 1}{" "}
                                          {estimate.estimateType}
                                        </h3>
                                      </View>
                                      {activeQuote === estimateIndex &&
                                        estimate.questionID &&
                                        estimate.answer && (
                                          <View className="quoteContentContainers">
                                            {estimate.questionID
                                              .split(",")
                                              .map((questionID, i) => (
                                                <View
                                                  key={`${estimateIndex}_${i}`}
                                                  className="questionAndAnswer"
                                                >
                                                  <p className="userQuestionParameter">
                                                    Q:{" "}
                                                    {convertQuestionIdsToText(
                                                      questionID
                                                    )}
                                                  </p>
                                                  <p className="userAnswerParameter">
                                                    A:{" "}
                                                    {
                                                      estimate.answer.split(
                                                        ","
                                                      )[i]
                                                    }
                                                  </p>
                                                </View>
                                              ))}
                                          </View>
                                        )}
                                    </View>
                                  ))
                              : showQuotes && (
                                  <>
                                    <p>견적요청이 없습니다.</p>
                                    <Link to="">
                                      <p>견적 받으로 가기</p>
                                    </Link>
                                  </>
                                )}
                          </li>
                        </View>
                        <View className="userParameter">
                          <h2 onClick={() => handleToggle("progress")}>
                            받은 견적
                          </h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar진행증">
                            {showProgress && acceptedEstimates.acceptedEstimates
                              ? acceptedEstimates.acceptedEstimates.map(
                                  (estimate, index) => (
                                    <View
                                      key={index}
                                      onClick={() => handlePairClick(index)}
                                    >
                                      <View className="userSmallInfo">
                                        <h3>견적서 {index + 1}</h3>
                                      </View>
                                      <View className="quoteContentContainer">
                                        {estimate.questionID
                                          .split(",")
                                          .map((questionID, i) => (
                                            <View
                                              key={`${index}_${i}`}
                                              className="questionAndAnswer"
                                            >
                                              <p className="userQuestionParameter">
                                                Q:{" "}
                                                {convertQuestionIdsToText(
                                                  questionID
                                                )}
                                              </p>
                                              <p className="userAnswerParameter">
                                                A:{" "}
                                                {estimate.answer.split(",")[i]}
                                              </p>
                                            </View>
                                          ))}
                                      </View>
                                      <p>
                                        Estimate Type: {estimate.estimateType}
                                      </p>
                                      <p>
                                        Created At:{" "}
                                        {new Date(
                                          estimate.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </View>
                                  )
                                )
                              : showProgress && (
                                  <>
                                    <p>받은 견적서가 없습니다.</p>
                                  </>
                                )}
                          </li>
                        </View>
                      </ul>
                    )}
                    {activeMenuItem === "help" && (
                      <View className="userParameter">
                        <h2>Help Content</h2>
                        <hr />
                        <p>Help Center</p>
                      </View>
                    )}
                  </View>
                </>
              );
              break;
            case "proUser":
              return (
                <>
                  <View className="profile-content">
                    {/* Render content based on activeMenuItem */}
                    {activeMenuItem === "Accound Details" && (
                      <View className="userParameter">
                        <h2>Accound Details</h2>
                        <hr />
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Phone Number: {userData.phoneNumber}</p>
                      </View>
                    )}
                    {activeMenuItem === "Payment Details" && (
                      <View className="userParameter">
                        <h2>결제 수단</h2>
                        <hr />
                        <p>Bank</p>
                      </View>
                    )}
                    {isEstimateMenuItem && (
                      <ul className="userHiddenBarControler">
                        <View className="userParameter">
                          <h2 onClick={() => handleToggle("quotes")}>견적</h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar">
                            {showQuotes &&
                            estimateData.estimate &&
                            estimateData.estimate.length > 0
                              ? estimateData.estimate
                                  .filter((estimate) => !estimate.accepted)
                                  .map((estimate, estimateIndex) => (
                                    <View
                                      key={estimate.estimateUniqueID}
                                      onClick={() =>
                                        handlePairClick(estimateIndex)
                                      }
                                    >
                                      <View className="userSmallInfo">
                                        <h3>
                                          견적서 {estimateIndex + 1}
                                          <button
                                            onClick={() =>
                                              handleAcceptEstimate(
                                                estimate.estimateUniqueID
                                              )
                                            }
                                          >
                                            Accept
                                            {estimate.estimateUniqueID}
                                          </button>
                                        </h3>
                                      </View>
                                      {activeQuote === estimateIndex &&
                                        estimate.questionID &&
                                        estimate.answer && (
                                          <View className="quoteContentContainer">
                                            {estimate.questionID
                                              .split(",")
                                              .map((questionID, i) => (
                                                <View
                                                  key={`${estimateIndex}_${i}`}
                                                  className="questionAndAnswer"
                                                >
                                                  <p className="userQuestionParameter">
                                                    Q:{" "}
                                                    {convertQuestionIdsToText(
                                                      questionID
                                                    )}
                                                  </p>
                                                  <p className="userAnswerParameter">
                                                    A:{" "}
                                                    {
                                                      estimate.answer.split(
                                                        ","
                                                      )[i]
                                                    }
                                                  </p>
                                                </View>
                                              ))}
                                          </View>
                                        )}
                                    </View>
                                  ))
                              : showQuotes && <p>견적요청이 없습니다.</p>}
                          </li>
                        </View>
                        <View className="userParameter">
                          <h2 onClick={() => handleToggle("progress")}>
                            진행증
                          </h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar진행증">
                            {showProgress &&
                              acceptedEstimates.acceptedEstimates &&
                              acceptedEstimates.acceptedEstimates.map(
                                (estimate, index) => (
                                  <View
                                    key={index}
                                    onClick={() => handlePairClick(index)}
                                  >
                                    <View className="userSmallInfo">
                                      <h3>견적서 {index + 1}</h3>
                                    </View>
                                    <View className="quoteContentContainer">
                                      {estimate.questionID
                                        .split(",")
                                        .map((questionID, i) => (
                                          <View
                                            key={`${index}_${i}`}
                                            className="questionAndAnswer"
                                          >
                                            <p className="userQuestionParameter">
                                              Q:{" "}
                                              {convertQuestionIdsToText(
                                                questionID
                                              )}
                                            </p>
                                            <p className="userAnswerParameter">
                                              A: {estimate.answer.split(",")[i]}
                                            </p>
                                          </View>
                                        ))}
                                    </View>
                                    <p>
                                      Estimate Type: {estimate.estimateType}
                                    </p>
                                    <p>
                                      Created At:{" "}
                                      {new Date(
                                        estimate.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </View>
                                )
                              )}
                          </li>
                        </View>
                        {/* 공사 완료 */}
                        <View className="userParameter">
                          <h2>공사 완료</h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar">
                            {/* Content for '공사 완료' */}
                          </li>
                        </View>
                      </ul>
                    )}
                    {activeMenuItem === "help" && (
                      <View className="userParameter">
                        <h2>Help Content</h2>
                        <hr />
                        <p>Help Center</p>
                      </View>
                    )}
                  </View>
                </>
              );
            case "admin":
              return (
                <>
                  <View className="profile-content">
                    {/* Render content based on activeMenuItem */}
                    {activeMenuItem === "Accound Details" && (
                      <View className="userParameter">
                        <h2>Accound Details</h2>
                        <hr />
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Phone Number: {userData.phoneNumber}</p>
                      </View>
                    )}
                    {activeMenuItem === "Payment Details" && (
                      <View className="userParameter">
                        <h2>Payment Details</h2>
                        <hr />
                        <p>Bank</p>
                      </View>
                    )}
                    {isEstimateMenuItem && (
                      <ul className="userHiddenBarControler">
                        <View className="userParameter">
                          <h2 onClick={() => handleToggle("quotes")}>견적</h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar">
                            {showQuotes &&
                            estimateData.estimate &&
                            estimateData.estimate.length > 0
                              ? estimateData.estimate
                                  .filter((estimate) => !estimate.accepted)
                                  .map((estimate, estimateIndex) => (
                                    <View
                                      key={estimate.estimateUniqueID}
                                      onClick={() =>
                                        handlePairClick(estimateIndex)
                                      }
                                    >
                                      <View className="userSmallInfo">
                                        <h3>
                                          견적서 {estimateIndex + 1}
                                          <button
                                            onClick={() =>
                                              handleAcceptEstimate(
                                                estimate.estimateUniqueID
                                              )
                                            }
                                          >
                                            Accept
                                            {estimate.estimateUniqueID}
                                          </button>
                                        </h3>
                                      </View>
                                      {activeQuote === estimateIndex &&
                                        estimate.questionID &&
                                        estimate.answer && (
                                          <View className="quoteContentContainer">
                                            {estimate.questionID
                                              .split(",")
                                              .map((questionID, i) => (
                                                <View
                                                  key={`${estimateIndex}_${i}`}
                                                  className="questionAndAnswer"
                                                >
                                                  <p className="userQuestionParameter">
                                                    Q:{" "}
                                                    {convertQuestionIdsToText(
                                                      questionID
                                                    )}
                                                  </p>
                                                  <p className="userAnswerParameter">
                                                    A:{" "}
                                                    {
                                                      estimate.answer.split(
                                                        ","
                                                      )[i]
                                                    }
                                                  </p>
                                                </View>
                                              ))}
                                          </View>
                                        )}
                                    </View>
                                  ))
                              : showQuotes && <p>견적요청이 없습니다.</p>}
                          </li>
                        </View>
                        <View className="userParameter">
                          <h2 onClick={() => handleToggle("progress")}>
                            진행증
                          </h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar진행증">
                            {showProgress &&
                              acceptedEstimates.acceptedEstimates &&
                              acceptedEstimates.acceptedEstimates.map(
                                (estimate, index) => (
                                  <View
                                    key={index}
                                    onClick={() => handlePairClick(index)}
                                  >
                                    <View className="userSmallInfo">
                                      <h3>견적서 {index + 1}</h3>
                                    </View>
                                    <View className="quoteContentContainer">
                                      {estimate.questionID
                                        .split(",")
                                        .map((questionID, i) => (
                                          <View
                                            key={`${index}_${i}`}
                                            className="questionAndAnswer"
                                          >
                                            <p className="userQuestionParameter">
                                              Q:{" "}
                                              {convertQuestionIdsToText(
                                                questionID
                                              )}
                                            </p>
                                            <p className="userAnswerParameter">
                                              A: {estimate.answer.split(",")[i]}
                                            </p>
                                          </View>
                                        ))}
                                    </View>
                                    <p>
                                      Estimate Type: {estimate.estimateType}
                                    </p>
                                    <p>
                                      Created At:{" "}
                                      {new Date(
                                        estimate.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </View>
                                )
                              )}
                          </li>
                        </View>
                        {/* 공사 완료 */}
                        <View className="userParameter">
                          <h2>공사 완료</h2>
                          <hr className="userBroker" />
                          <li className="userHiddenBar">
                            {/* Content for '공사 완료' */}
                          </li>
                        </View>
                      </ul>
                    )}
                    {activeMenuItem === "help" && (
                      <View className="userParameter">
                        <h2>Help Content</h2>
                        <hr />
                        <p>Help Center</p>
                      </View>
                    )}
                  </View>
                </>
              );
            default:
              return null;
          }
        })()}
      </View>
    </>
  );
};

export default UserSettings;
