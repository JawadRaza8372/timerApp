import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import { screenBg, stopColor } from "../AppColors";
import CustomInput from "../Components/CustomInput";
import CustomLoginUser from "../Components/CustomLoginUser";
import CustomPaswdInput from "../Components/CustomPaswdInput";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
const UpdateUserScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainDiv}>
      <View style={styles.introdiv}>
        <Text style={styles.heading}>User Details</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            console.log("clicked");
          }}
          style={styles.backbtn}
        >
          <Entypo name="chevron-left" size={h("5%")} color="black" />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inputs}>
          <View>
            <Text style={styles.labl}>Role</Text>

            <CustomLoginUser title="User" />
          </View>
          <View>
            <Text style={styles.labl}>Last Name</Text>

            <CustomInput />
          </View>
          <View>
            <Text style={styles.labl}>First Name</Text>

            <CustomInput />
          </View>
          <View>
            <Text style={styles.labl}>Email</Text>

            <CustomInput />
          </View>
          <View>
            <Text style={styles.labl}>Password</Text>

            <CustomPaswdInput />
          </View>

          <CustomAuthBtn title="Update" onClick={() => console.log("done")} />
          <CustomAuthBtn
            bgColor={stopColor}
            title="Delete"
            onClick={() => console.log("done")}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateUserScreen;

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
    width: w("80%"),
    alignSelf: "center",
    height: h("80%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  introdiv: {
    width: "90%",
    height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    position: "relative",
  },
  desc: {
    fontSize: h("2.2%"),
    textAlign: "center",
  },
  backbtn: {
    height: "100%",
    width: h("5.5%"),
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
