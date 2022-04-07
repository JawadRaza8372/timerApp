import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import { screenBg, stopColor } from "../AppColors";
import CustomInput from "../Components/CustomInput";
import CustomLoginUser from "../Components/CustomLoginUser";
import CustomPaswdInput from "../Components/CustomPaswdInput";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
const AddUserScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainDiv}>
      <View style={styles.introdiv}>
        <Text style={styles.heading}>New User</Text>
        <Text style={styles.desc}>Fill in all the fields below</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inputs}>
          <View>
            <Text style={styles.labl}>Role</Text>

            <CustomLoginUser title="User" />
          </View>
          <View>
            <Text style={styles.labl}>Last Name</Text>

            <CustomInput placeholder="Doe" />
          </View>
          <View>
            <Text style={styles.labl}>First Name</Text>

            <CustomInput placeholder="Jhon" />
          </View>
          <View>
            <Text style={styles.labl}>Email</Text>

            <CustomInput placeholder="email@example.com" />
          </View>

          <View>
            <Text style={styles.labl}>Password</Text>

            <CustomPaswdInput />
          </View>

          <CustomAuthBtn title="Add" onClick={() => console.log("done")} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  mainDiv: {
    width: "100%",
    height: "100%",
    backgroundColor: screenBg,
  },
  heading: {
    fontSize: h("4%"),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: h("1.5%"),
  },
  labl: {
    marginBottom: h("1%"),
    fontSize: h("2.3%"),
    fontWeight: "500",
  },
  inputs: {
    width: w("95%"),
    alignSelf: "center",
    height: h("79%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  introdiv: {
    width: "100%",
    height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  desc: {
    fontSize: h("2.2%"),
    textAlign: "center",
  },
});
