import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Feather, Zocial } from "@expo/vector-icons";
import { inputBg, mainColor } from "../AppColors";
import { w, h } from "react-native-responsiveness";
const CustomInput = ({ iconName }) => {
  return (
    <View style={styles.customInptdiv}>
      {iconName && (
        <Zocial name={`${iconName}`} size={h("3%")} color={mainColor} />
      )}
      <TextInput
        style={{
          ...styles.custminp,
          width: iconName ? "86%" : "100%",
          paddingHorizontal: iconName ? 0 : 10,
        }}
        placeholder="enter paswword"
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  customInptdiv: {
    width: w("88%"),
    borderRadius: h("1%"),
    backgroundColor: inputBg,
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignSelf: "center",
  },
  custminp: {
    height: "100%",
    backgroundColor: "transparent",
  },
});
