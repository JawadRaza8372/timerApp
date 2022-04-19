import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import { inputBg } from "../AppColors";
const UnAvilData = () => {
  return (
    <View style={styles.nofounddiv}>
      <Text style={styles.heading}>No Data Found.</Text>
    </View>
  );
};
const LoadingData = () => {
  return (
    <View style={styles.nofounddiv}>
      <Text style={styles.heading}>Loading</Text>
    </View>
  );
};
export default UnAvilData;
export { LoadingData };
const styles = StyleSheet.create({
  nofounddiv: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: h("3%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
  },
});
