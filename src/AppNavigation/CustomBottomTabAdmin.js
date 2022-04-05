import React, { useState } from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
  BottomTabBarHeightContext,
  useBottomTabBarHeight,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Foundation,
  FontAwesome,
  Entypo,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import { inputBg, mainColor, screenBg } from "../AppColors";
import TimerScreen from "../Views/TimerScreen";
import ActivityScreen from "../Views/ActivityScreen";
import { TouchableOpacity, View, Text } from "react-native";
import { w, h } from "react-native-responsiveness";
import Dashbord from "../Views/Dashbord";
import AddUserScreen from "../Views/AddUserScreen";
import TaskSettings from "../Views/TaskSettings";
const CustomBottomTabAdmin = () => {
  const [showAdd, setshowAdd] = useState(false);
  const CustomTabButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          top: -h("3%"),
          height: h("7%"),
          width: h("7%"),
          borderRadius: h("7%"),
          borderWidth: h("0.6%"),
          borderColor: screenBg,
          backgroundColor: mainColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </TouchableOpacity>
    );
  };
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
          position: "relative",
        },
        tabBarActiveTintColor: screenBg,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "lightgrey",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashbord}
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
              <Text style={{ color: color }}>Dashboard</Text>
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
        name="AddUser"
        component={AddUserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" color={color} size={h("4%")} />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={TaskSettings}
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
              <Text style={{ color: color }}>Parameters</Text>
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

export default CustomBottomTabAdmin;
