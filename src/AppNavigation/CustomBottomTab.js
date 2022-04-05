import React from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
  BottomTabBarHeightContext,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Foundation,
  FontAwesome,
  Entypo,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { w, h } from "react-native-responsiveness";
const Tab = createBottomTabNavigator();

import { inputBg, mainColor, screenBg } from "../AppColors";
import TimerScreen from "../Views/TimerScreen";
import ActivityScreen from "../Views/ActivityScreen";
const CustomBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Timer"
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          backgroundColor: mainColor,
          elevation: 1,
        },
        tabBarActiveTintColor: screenBg,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarInactiveTintColor: "lightgrey",
      }}
    >
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <MaterialIcons name="timer" color={color} size={h("2.5%")} />
              <Text style={{ color: color }}>Timer</Text>
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 7,
                  backgroundColor: focused ? screenBg : mainColor,
                  position: "absolute",
                  bottom: -4,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <AntDesign name="filetext1" color={color} size={h("2.5%")} />
              <Text style={{ color: color }}>Activity</Text>
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 7,
                  backgroundColor: focused ? screenBg : mainColor,
                  position: "absolute",
                  bottom: -4,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomBottomTab;
