import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Interior from "../publicContainer/main/interior";
import CheckWaterproof from "../publicContainer/main/checkWaterproof";
import Clean from "../publicContainer/main/cleaning";
import Kitchen from "../publicContainer/main/SUB/주방";
import FloorandWall from "../publicContainer/main/SUB/도배";
import Waterwork from "../publicContainer/main/SUB/상수도";
import Sewer from "../publicContainer/main/SUB/하수도";
import Bathroom from "../publicContainer/main/SUB/욕실";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const RepairStack = createStackNavigator();
const PartInteriorStack = createStackNavigator();

const RepairStackScreen = () => (
  <RepairStack.Navigator>
    <Stack.Screen name="상수도" component={Waterwork} />
    <Stack.Screen name="하수도" component={Sewer} />
    <Stack.Screen name="욕실" component={Bathroom} />
  </RepairStack.Navigator>
);
const PartInteriorStackScreen = () => (
  <PartInteriorStack.Navigator>
    <Stack.Screen name="주방" component={Kitchen} />
    <Stack.Screen name="도배" component={FloorandWall} />
  </PartInteriorStack.Navigator>
);
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="인테리어" component={Interior} />
      <Drawer.Screen name="부분인테리어" component={PartInteriorStackScreen} />
      <Drawer.Screen name="수리" component={RepairStackScreen} />
      <Drawer.Screen name="누수방수" component={CheckWaterproof} />
      <Drawer.Screen name="청소" component={Clean} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
