import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer = () => {
  const navigation = useNavigation();

  const handleLink = (url) => {
    Linking.openURL(url);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={FooterStyle.footer}>
      <View style={FooterStyle.footerAddr}>
        <Text style={FooterStyle.footerLogo}>Hi우리집</Text>
        <View style={FooterStyle.Address}>
          <Text style={FooterStyle.addressText}>
            주소: **** | 연락처: 02-1234-5678
          </Text>
          <TouchableOpacity
            style={FooterStyle.footerBtn}
            onPress={() => handleLink("mailto:example@gmail.com")}
          >
            <Text style={FooterStyle.footerBtnText}>Email Us</Text>
          </TouchableOpacity>
          <View style={FooterStyle.iconContainer}>
            <TouchableOpacity
              onPress={() => handleLink("https://www.instagram.com")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" size={30} color="#517fa4" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLink("https://www.facebook.com")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            {/* Add more social icons as needed */}
          </View>
        </View>
      </View>
      <View style={FooterStyle.footerNav}>
        <View style={FooterStyle.navItem}>
          <Text style={FooterStyle.navTitle}>회사</Text>
          <View style={FooterStyle.navUl}>
            <TouchableOpacity onPress={() => navigateToScreen("BusinessIntro")}>
              <Text style={FooterStyle.navLink}>회사소개</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLink("https://www.blog-url.com")}
            >
              <Text style={FooterStyle.navLink}>블로그</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={FooterStyle.navItem}>
          <Text style={FooterStyle.navTitle}>협력업체</Text>
          <View style={FooterStyle.navUl}>
            <TouchableOpacity
              onPress={() => navigateToScreen("/auth/prosignup")}
            >
              <Text style={FooterStyle.navLink}>협력업체 가입</Text>
            </TouchableOpacity>
            {/* You had an empty <Text> here; adjust if needed */}
          </View>
        </View>
        <View style={FooterStyle.navItem}>
          <Text style={FooterStyle.navTitle}>도움</Text>
          <View style={FooterStyle.navUl}>
            <TouchableOpacity onPress={() => navigateToScreen("CostumerHelp")}>
              <Text style={FooterStyle.navLink}>고객센터</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen("Agreeterm")}>
              <Text style={FooterStyle.navLink}>이용약관</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen("PrivateAgree")}>
              <Text style={FooterStyle.navLink}>개인정보처리방첨</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={FooterStyle.appButtons}>
          <TouchableOpacity
            onPress={() => handleLink("https://hiwoorizip.shop")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              style={FooterStyle.appStoreButton}
              source={require("../../assets/Photo/Download_on_the_App_Store_Badge_KR_blk_100317.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLink("https://hiwoorizip.shop")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              style={FooterStyle.playStoreButton}
              source={require("../../assets/Photo/google-play-badge.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FooterStyle = StyleSheet.create({
  footer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerAddr: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Address: {
    flex: 1,
  },
  addressText: {
    marginBottom: 5,
  },
  footerBtn: {
    backgroundColor: "#3498db",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: 210,
  },
  footerBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    paddingRight: 20,
  },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navItem: {
    flex: 1,
    marginRight: 15,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  navLink: {
    marginBottom: 5,
  },
  appButtons: {
    marginTop: 10,
  },
  appStoreButton: {
    width: 140,
    height: 40,
  },
  playStoreButton: {
    width: 140,
    height: 50,
  },
});

export default Footer;
