import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { inputBg, mainColor, screenBg } from "../AppColors";
import { w, h } from "react-native-responsiveness";
const Plans = ({ value, title, usercapcity, price, onClick }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick({ title, price, usercapcity })}
      style={{
        ...styles.subtype,
        backgroundColor: value === title ? mainColor : screenBg,
      }}
    >
      <Text
        style={{
          ...styles.heading,
          color: value === title ? screenBg : mainColor,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...styles.feature,
          color: inputBg,
        }}
      >
        User Capicity: {usercapcity}
      </Text>
      <Text
        style={{
          ...styles.price,
          color: value === title ? screenBg : mainColor,
        }}
      >
        Price: {price} $
      </Text>
    </TouchableOpacity>
  );
};

export default Plans;

const styles = StyleSheet.create({
  heading: {
    fontSize: h("3%"),
    fontWeight: "bold",
  },
  feature: {
    fontSize: h("2%"),
    fontWeight: "600",
  },
  price: {
    fontSize: h("1.8%"),
  },
  subtype: {
    width: "45%",
    height: "100%",
    borderRadius: h("2%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  activecolor: {
    color: screenBg,
  },
  inactivecolor: {
    color,
  },
});
