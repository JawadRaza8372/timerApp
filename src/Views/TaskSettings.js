import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { w, h } from "react-native-responsiveness";
import { inputBg, screenBg, mainColor } from "../AppColors";
import CustomInput from "../Components/CustomInput";
import { Entypo } from "@expo/vector-icons";
import CustomModel from "../Components/CustomModel";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import CustomLoginUser from "../Components/CustomLoginUser";
const TaskSettings = ({ navigation }) => {
  const [openModel, setopenModel] = useState(false);
  const [isRemember, setisRemember] = useState(false);
  const toggleModelf = () => {
    setopenModel(!openModel);
  };
  return (
    <>
      <SafeAreaView style={styles.mainDiv}>
        <Text style={styles.heading}>Parameters</Text>
        <KeyboardAwareScrollView>
          <View style={styles.filldiv}>
            <View style={styles.inputs}>
              <Text style={styles.litheadig}>Tasks</Text>
              <View style={styles.tasksCont}>
                <TouchableOpacity onPress={toggleModelf} style={styles.tasks}>
                  <Text>Working</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModelf} style={styles.tasks}>
                  <Text>Break</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleModelf}
                  style={styles.addtasks}
                >
                  <TextInput
                    placeholder="Enter New Task"
                    style={styles.myinput}
                  />
                  <TouchableOpacity style={styles.addbtnn}>
                    <Entypo name="plus" size={24} color="black" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.litheadig}>Email</Text>

                <CustomInput placeholder="email@example.com" />
              </View>
              <View>
                <Text style={styles.litheadig}>Default Login Page</Text>
                <CustomLoginUser title={"Kiosk"} />
              </View>
            </View>
            <View style={styles.subscriptiondiv}>
              <Text style={styles.litheadig}>
                Informations about your subscription
              </Text>
              <View style={styles.contentDiv}>
                <View style={{ width: "100%" }}>
                  <View style={styles.tasks}>
                    <Text>Your subscription is active</Text>
                  </View>
                  <View style={styles.tasks}>
                    <Text>Number of users : 9/10</Text>
                  </View>
                  <View style={styles.tasks}>
                    <Text>Your role : Administrator (Manager)</Text>
                  </View>
                </View>
                <CustomAuthBtn title={"Change Subscription"} />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <CustomModel show={openModel} toggleModal={toggleModelf}>
        <View style={styles.modelDiv}>
          <View style={styles.introdiv}>
            <Text style={styles.heading}>Task Parameters</Text>
            <TouchableOpacity onPress={toggleModelf} style={styles.backbtn}>
              <Entypo name="chevron-left" size={h("5%")} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.litheadig}>Task</Text>

            <CustomInput placeholder={"Working"} />
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
              <Text>is Working</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btndiv}>
          <CustomAuthBtn title="Update" />
        </View>
      </CustomModel>
    </>
  );
};

export default TaskSettings;

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
  filldiv: {
    width: "100%",
    flex: 1,
    position: "relative",
  },
  subscriptiondiv: {
    width: "100%",
    height: h("35%"),
    // backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    // position: "absolute",
    // bottom: 0,
  },
  inputs: {
    width: w("95%"),
    alignSelf: "center",
    height: h("50%"),
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    // flexDirection: "column",
  },
  tasksCont: {
    width: w("88%"),
    height: h("19%"),
    backgroundColor: inputBg,
    alignSelf: "center",
    borderRadius: h("2%"),
    marginBottom: h("2%"),
  },
  tasks: {
    width: "90%",
    alignSelf: "center",
    height: h("6%"),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  addtasks: {
    width: "90%",
    alignSelf: "center",
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contentDiv: {
    width: w("88%"),
    height: "77%",
    alignSelf: "center",
    backgroundColor: inputBg,
    borderRadius: h("2%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  litheadig: {
    fontSize: h("2.3%"),
    fontWeight: "500",
    marginBottom: h("1%"),
    textAlign: "left",
    width: "95%",
  },
  modelDiv: {
    width: "100%",
    height: "80%",
    backgroundColor: screenBg,
    paddingHorizontal: w("2%"),
  },
  btndiv: {
    width: "100%",
    height: "20%",
    backgroundColor: screenBg,
    paddingHorizontal: w("2%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  introdiv: {
    width: "95%",
    height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    position: "relative",
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
  myinput: {
    flex: 1,
    height: "100%",
  },
  addbtnn: {
    width: w("10%"),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnsDiv: {
    width: "100%",
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  remberbtn: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
});
