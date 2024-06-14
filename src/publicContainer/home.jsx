import React from "react";
import Sect from "./section";
import Artic from "./article";
import Footer from "./footer";
import { View, ScrollView, SafeAreaView } from "react-native";
import NavBar from "./nav";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View>
          <NavBar />
          <Sect />
          <Artic />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
