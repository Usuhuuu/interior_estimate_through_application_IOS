import React from "react";
import "./css/smallDesign.css";
const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";
import Artic from "../article";
import Footer from "../footer";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Kitchen from "./SUB/주방";
import FloorandWall from "./SUB/도배";
const PartInterior = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <>
      <View>
        <View style={"bugdinTsagaan"}>
          <View style={"imageContainers"}>
            <View style={"imageChange"}>
              <View style={"imagesss"}>
                <TouchableOpacity
                  onPress={() => navigateToScreen(Kitchen)}
                  style={"image-link"}
                >
                  <Image source="../../../public/Photo/kitchen.jpg" alt="" />
                  <Text>주방</Text>
                </TouchableOpacity>
              </View>
              <View style={"imagesss"}>
                <TouchableOpacity
                  onPress={() => navigateToScreen(FloorandWall)}
                  style={"image-link"}
                >
                  <Image source="../../../public/Photo/wall.jpg" alt="" />
                  <Text>도배</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Artic />
          <Footer />
        </View>
      </View>
    </>
  );
};
export default PartInterior;
