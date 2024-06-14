import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";

const Artic = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <View style={articleStyle.article}>
      <Text style={articleStyle.h1}>홈서비스</Text>
      <Text style={articleStyle.h3}>인기 추천 서비스</Text>
      <Text style={articleStyle.p}>작은 변화로 새로운 공간 만들기</Text>
      <View style={articleStyle.homeServiceContainer} />
      <View style={articleStyle.homeService}>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("인테리어")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(
                require("../../assets/Photo/homeInterior.png")
              )}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>집인테리어</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("인테리어")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(require("../../assets/Photo/청소.jpg"))}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>상업인테리어</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("청소")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(
                require("../../assets/Photo/에어컨청소.png")
              )}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>에어커 청소</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("청소")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(require("../../assets/Photo/청소.jpg"))}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>청소</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("주방")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(
                require("../../assets/Photo/주방인테리어.jpg")
              )}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>주방 인테리어</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("도배")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(
                require("../../assets/Photo/도배장판.jpg")
              )}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>도배 / 장판</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("누수방수")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(require("../../assets/Photo/방수.png"))}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>방수 / 누수</Text>
        </View>
        <View style={articleStyle.service}>
          <TouchableOpacity onPress={() => navigateToScreen("수리")}>
            <Image
              style={articleStyle.articleImage}
              source={Asset.fromModule(require("../../assets/Photo/설비.jpg"))}
            />
          </TouchableOpacity>
          <Text style={articleStyle.serviceText}>설비 / 수리</Text>
        </View>
      </View>
    </View>
  );
};
const articleStyle = StyleSheet.create({
  article: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  h1: {
    paddingTop: "10%",
    fontSize: 28,
    marginVertical: 20,
    color: "black",
    paddingBottom: 100,
    textAlign: "center",
  },
  h3: {
    fontSize: 28,
    marginVertical: 10,
    color: "black",
    textAlign: "center",
  },
  p: {
    fontSize: 28,
    marginVertical: 10,
    paddingBottom: 10,
    color: "gray",
    textAlign: "center",
  },
  homeServiceContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    marginTop: 20,
    padding: 20,
  },
  homeService: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    overflowX: "auto",
    marginHorizontal: "1%",
    paddingBottom: 100,
  },
  service: {
    flex: 0,
    marginHorizontal: 10,
    textAlign: "center",
    transitionProperty: "transform",
    transitionDuration: ".2s",
    transformOrigin: "center center",
    paddingTop: 20,
  },
  articleImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.11,
    transform: [{ scale: 1.1 }],
  },
  serviceText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,
    paddingBottom: 20,
  },
});

export default Artic;
