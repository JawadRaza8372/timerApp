import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import { inputBg } from "../AppColors";
const UnAvilData = () => {
  return (
    <View style={styles.nofounddiv}>
      <Text style={styles.heading}>Data is not available</Text>
    </View>
  );
};

export default UnAvilData;

const styles = StyleSheet.create({
  nofounddiv: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: h("4%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
  },
});
