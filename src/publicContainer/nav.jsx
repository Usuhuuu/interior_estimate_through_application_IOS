import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const windowWidth = Dimensions.get("window").width;

const NavBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setModalVisible(!modalVisible);
  };

  const updateSearch = (text) => {
    setSearch(text);
  };

  const closeModal = () => {
    setSearchVisible(false);
    setModalVisible(false);
  };

  return (
    <>
      <View style={navBarStyle.navContainer}>
        <Image
          source={require("../../assets/logo2.png")}
          style={navBarStyle.iconImage}
        />
        <TouchableOpacity onPress={toggleSearch}>
          <Icon name="search" size={30} color="#000" style={navBarStyle.icon} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity
            style={navBarStyle.modalContainer}
            onPress={closeModal}
          >
            <SearchBar
              placeholder="Type Here..."
              onChangeText={updateSearch}
              value={search}
              containerStyle={navBarStyle.searchContainer}
              inputContainerStyle={navBarStyle.inputContainer}
              onCancel={closeModal}
            />
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

const navBarStyle = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  icon: {
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 75,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "#fff",
  },
  inputContainer: {
    backgroundColor: "#fff",
  },
});

export default NavBar;
