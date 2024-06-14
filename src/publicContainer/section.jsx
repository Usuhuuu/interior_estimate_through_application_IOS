import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const windowWidth = Dimensions.get("window").width;

const Sect = () => {
  return (
    <View style={sectionStyle.sectionContainer}>
      <Swiper
        loop={true}
        autoplay={true}
        showsButtons={false}
        pagination={true}
        dot={
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: "grey",
              margin: 3,
              borderRadius: 5,
            }}
          ></View>
        }
        activeDot={
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "blue",
              margin: 3,
              borderRadius: 5,
            }}
          ></View>
        }
        style={sectionStyle.swiper}
      >
        <Image
          source={require("../../assets/sliderPhoto/slider1.png")}
          style={sectionStyle.fitImage}
        />

        <Image
          source={require("../../assets/sliderPhoto/slider2.jpg")}
          style={sectionStyle.fitImage}
        />

        <Image
          source={require("../../assets/sliderPhoto/slider3.jpg")}
          style={sectionStyle.fitImage}
        />
      </Swiper>
      <View style={sectionStyle.entertainmentThings}></View>
    </View>
  );
};

const sectionStyle = StyleSheet.create({
  sectionContainer: {
    maxWidth: "100%",
    height: 300,
    flex: 1,
    marginBottom: -20,
    backgroundColor: "#fff",
  },
  fitImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});

export default Sect;
