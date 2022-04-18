import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomPaswdInput from "./CustomPaswdInput";
import { w, h } from "react-native-responsiveness";
import CustomAuthBtn from "./CustomAuthBtn";
import { inputBg, mainColor } from "../AppColors";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
const AdminLogin = ({ onSubmit }) => {
  const [isRemember, setisRemember] = useState(false);
  const [formSubmit, setformSubmit] = useState({ email: "", password: "" });
  const submission = () => {
    if (formSubmit.email && formSubmit.password) {
      onSubmit(formSubmit, isRemember);
    } else {
      alert("Please Fill All the Fields.");
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.logindivv}>
        <View style={styles.introdiv}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.desc}>Log in to access to your timer</Text>
        </View>
        <View style={styles.inputs}>
          <View>
            <Text style={styles.labl}>Email</Text>
            <CustomInput
              iconName="email"
              placeholder="email@example.com"
              value={formSubmit.email}
              onChange={(text) =>
                setformSubmit((prevalue) => {
                  return {
                    ...prevalue,
                    email: text,
                  };
                })
              }
            />
          </View>
          <View>
            <Text style={styles.labl}>Password</Text>
            <CustomPaswdInput
              iconName="lock"
              value={formSubmit.password}
              onChange={(text) =>
                setformSubmit((prevalue) => {
                  return {
                    ...prevalue,
                    password: text,
                  };
                })
              }
              maxLength={5}
            />
          </View>
          <View style={styles.btnsDiv}>
            <TouchableOpacity
              style={styles.remberbtn}
              onPress={() => setisRemember(!isRemember)}
            >
              <View
                style={
                  isRemember
                    ? [styles.emptybox, styles.active]
                    : styles.emptybox
                }
              />
              <Text>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgtBtn}>
              <Text style={{ color: mainColor }}>Forgot Your Password</Text>
            </TouchableOpacity>
          </View>
          <CustomAuthBtn title="Login" onClick={submission} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  heading: {
    fontSize: h("4%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    fontSize: h("2.2%"),
    textAlign: "center",
  },
  inputs: {
    width: w("95%"),
    height: "55%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  logindivv: {
    height: h("90%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  emptybox: {
    width: h("2%"),
    height: h("2%"),
    borderRadius: h("4%"),
    backgroundColor: inputBg,
    overflow: "hidden",
    marginRight: h("1%"),
  },
  active: { backgroundColor: mainColor },
  btnsDiv: {
    width: w("88%"),
    height: h("6%"),
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  remberbtn: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  forgtBtn: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  labl: {
    marginBottom: h("1%"),
    fontSize: h("2.3%"),
    fontWeight: "500",
  },
  introdiv: {
    width: "100%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
