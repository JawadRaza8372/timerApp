import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";

const CustomModel = ({ show, toggleModal, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={toggleModal}
    >
      <View style={styles.bgdiv}>
        <TouchableOpacity
          onPress={toggleModal}
          style={{ width: "100%", flex: 1 }}
        />
        {children}
        <TouchableOpacity
          onPress={toggleModal}
          style={{ width: "100%", flex: 1 }}
        />
      </View>
    </Modal>
  );
};

export default CustomModel;

const styles = StyleSheet.create({
  bgdiv: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
