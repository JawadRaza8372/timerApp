import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { inputBg, mainColor } from "../AppColors";
import { w, h } from "react-native-responsiveness";
const CustomPaswdInput = ({ iconName, value, onChange }) => {
  const [showPaswd, setshowPaswd] = useState(true);
  return (
    <View style={styles.customInptdiv}>
      {iconName && (
        <MaterialCommunityIcons
          name={`${iconName}`}
          size={h("3%")}
          color={mainColor}
        />
      )}
      <TextInput
        style={{ ...styles.custminp, width: iconName ? "76%" : "86%" }}
        placeholder="********"
        secureTextEntry={showPaswd}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity
        style={styles.inpBtn}
        onPress={() => setshowPaswd(!showPaswd)}
      >
        <Feather
          name={showPaswd ? "eye-off" : "eye"}
          size={h("2.5%")}
          color={mainColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPaswdInput;

const styles = StyleSheet.create({
  customInptdiv: {
    width: w("88%"),
    backgroundColor: inputBg,
    borderRadius: h("1%"),
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
  inpBtn: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "8%",
  },
});
