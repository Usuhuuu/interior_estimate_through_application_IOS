import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../CSS/style.css";

const urlApi = "https://hiwoorizip-ff4cfc190fb7.herokuapp.com";

const NavigationBar = () => {
  return (
    <nav>
      <View style={`navContainer ${isMenuOpen ? "active" : ""}`}>
        <View>
          <li>
            <Link to="/interior" style="navMenu">
              종합인테리어
            </Link>
          </li>
          <li>
            <Link to="/partInterior" style="navMenu">
              부분인테리어
            </Link>
            <View
              style={
                subNavVisibility.interior
                  ? "dropdown-content actives"
                  : "dropdown-content"
              }
            >
              <View style="hudsda">
                <li>
                  <Link to="/interior/kitchen">주방</Link>
                </li>
                <li>
                  <Link to="/interior/floorAndWall">도배</Link>
                </li>
              </View>
            </View>
          </li>
          <li>
            <Link
              to="/repair"
              style="navMenu"
              onMouseEnter={() => handleMouseEnter("repair")}
              onMouseLeave={() => handleMouseLeave("repair")}
            >
              설비/수리
              <ArrowDropDownIcon style="arrowDown" />
            </Link>
            <View
              style={
                subNavVisibility.repair
                  ? "dropdown-content active"
                  : "dropdown-content"
              }
            >
              <View>
                <li>
                  <Link to="/repair/waterwork">상수도</Link>
                </li>
                <li>
                  <Link to="/repair/sewer">하수도</Link>
                </li>
                <li>
                  <Link to="/repair/bathroom">욕실</Link>
                </li>
              </View>
            </View>
          </li>
          <li>
            <Link to="/checkwaterproof" style="navMenu">
              누수/방수
            </Link>
          </li>
          <li>
            <Link to="/cleaning" style="navMenu">
              청소
            </Link>
            {/* <View style={
                    subNavVisibility.cleaning
                    ? 'dropdown-content active'
                    : 'dropdown-content'}>
                <View>
                    <li><Link to="/sub/building">집청소</Link></li>
                    <li><Link to="/sub/building">건물</Link></li>
                    <li><Link to="/sub/aircondition">에어컨</Link></li>
                </View>
                </View> */}
          </li>

          {/* <hr style="herrgui" /> */}
          {/* <li>
                <View style="search">
                    <input type="text"placeholder="Search"value={searchValue}onChange={handleSearch}/>
                    <View style="symbol">
                    <FontAwesomeIcon icon={faSearch} style="faIcon" />
                    </View>
                    </View>
                </li>  */}
          {loggedInStatus === true ? (
            <li>
              <Link to="/user/usersettings" style="navMenu">
                마이페이지
              </Link>
              <Link to="#" style="navMenu" onClick={handleLogoutClick}>
                로그아웃
              </Link>
            </li>
          ) : (
            <li>
              <View style="LoginContainer">
                <Link to="/auth/login" style="navMenu" id="Engiin">
                  로그인
                </Link>
                <Link to="/auth/signup" style="navMenu" id="Engiin">
                  회원가입
                </Link>
                <Link to="/auth/prosignup" id="proUserDesign">
                  협력업체
                </Link>
              </View>
            </li>
          )}
        </View>
      </View>
      <View style={`menu-toggle ${isMenuOpen ? "active" : ""}`}>
        <label htmlFor="menu-btn" style="menu-btn" onClick={toggleMenu}>
          <span style="material-symbols-outlined">
            <MenuIcon />
          </span>
        </label>
      </View>
      <hr />
    </nav>
  );
};
export default NavigationBar;
