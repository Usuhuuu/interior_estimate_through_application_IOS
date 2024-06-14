import React, { useEffect, useState } from 'react';
import Artic from '../article';
import Footer from '../footer'
import { View, Text } from 'react-native';
import Waterleak from './waterLeak';
import Waterproof from './waterproof';
import { useNavigation } from '@react-navigation/native';

const CheckWaterproof = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    };
  return (
    <>
      <View style='bugdinTsagaan'>
      <View style='imageContainers'>
        <View style='imageChange'>
          <View style='imagesss'>
            <TouchableOpacity onPress={()=> navigateToScreen(Waterproof)} style={"image-link"}><Image source="../../../public/Photo/waterproof.jpg" alt=""/><Text style={p}>방수</Text></TouchableOpacity>
          </View>
          <View style='imagesss'>
          <TouchableOpacity onPress={()=> navigateToScreen(Waterleak)} style={"image-link"}><Image source="../../../public/Photo/leaking.jpg" alt="" /><Text style={p}>방수</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      <Artic/>
      </View>
      <Footer/>
    </>
  );
  
};
export default CheckWaterproof;
