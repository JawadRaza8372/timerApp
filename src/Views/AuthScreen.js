import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { screenBg } from "../AppColors";
import AdminLogin from "../Components/AdminLogin";
import EmployLogin from "../Components/EmployLogin";

const AuthScreen = ({ navigation }) => {
  const [isClientLayout, setisClientLayout] = useState(true);
  return (
    <SafeAreaView style={styles.mainDiv}>
      {isClientLayout ? (
        <EmployLogin
          onOther={() => setisClientLayout(!isClientLayout)}
          onSubmit={(data) => {
            console.log(data);
            navigation.navigate("Client");
          }}
        />
      ) : (
        <AdminLogin
          onSubmit={(data) => {
            console.log(data);
            navigation.navigate("Admin");
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  mainDiv: {
    width: "100%",
    height: "100%",
    backgroundColor: screenBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
