import React from 'react';
import Artic from '../article';
import Footer from '../footer'
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Waterwork from './SUB/상수도';
import Sewer from './SUB/하수도';
import Bathroom from './SUB/욕실';

const Repair = () => {
  const navigation = useNavigation();
    const navigateToScreen = (screenName) => {
      navigation.navigate(screenName);
      };
  return (
    <>
      <View style={'bugdinTsagaan'}>
      <View style={'imageContainer'}>
      <View style={'imageChang'}>
          <View style={'zurags'}>
            <TouchableOpacity onPress={()=> navigateToScreen(Waterwork)} style={"image-link"}><Image source="../../../public/Photo/상수도.jpg" alt="" /><Text>상수도</Text></TouchableOpacity>
          </View>
          <View style={'zurags'}>
            <TouchableOpacity onPress={()=> navigateToScreen(Sewer)} style={"image-link"}><Image source="../../../public/Photo/sewer.jpg" alt="" /><Text>하수도</Text></TouchableOpacity>
          </View>
          <View style={'zurags'}>
            <TouchableOpacity onPress={()=> navigateToScreen(Bathroom)} style={"image-link"}><Image source="../../../public/Photo/욕실.jpg" alt="" /><Text>욕실</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      <Artic/>
      </View>
      <Footer/>
    </>
  );
  
};
export default Repair;
