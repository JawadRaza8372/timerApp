import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { w, h } from "react-native-responsiveness";
import { inputBg, mainColor, screenBg } from "../AppColors";
import { color } from "react-native-reanimated";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import CustomModel from "./CustomModel";
import AnimatedTimeComp from "./AnimatedTimeComp";
import CustomInput from "./CustomInput";
import CustomAuthBtn from "./CustomAuthBtn";
import AdminActivityAdmin from "./AdminActivityAdmin";
const DayActivityAdmin = ({ date, activityArry, docid }) => {
  const [openModel, setopenModel] = useState(false);
  const toggleModel = () => {
    setopenModel(!openModel);
  };
  return (
    <>
      <View style={styles.mainActDiv}>
        <View style={styles.datdiv}>
          <Feather name="calendar" size={h("3.1%")} color="black" />
          <Text style={styles.dattxt}>{date}</Text>
        </View>
        <View style={styles.contentdiv}>
          {activityArry &&
            activityArry.map((dat, index) => (
              <AdminActivityAdmin
                TaskName={dat.TaskName}
                taskTime={dat.taskTime}
                docid={docid}
                key={index}
                myindex={index}
                fullArry={activityArry}
              />
            ))}
          {activityArry.length === 0 && (
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: h("3%") }}>No Data Available</Text>
            </View>
          )}
        </View>
        <View style={styles.txtcont}>
          <Text style={styles.sechead}>Today’s total working time</Text>
          <Text style={styles.firhead}>7 hr 45 mins</Text>
        </View>
      </View>
      <CustomModel show={openModel} toggleModal={toggleModel}>
        <View style={styles.modelDiv}>
          <TouchableOpacity onPress={toggleModel} style={styles.closebtn}>
            <Entypo name="cross" size={h("3.8%")} color="black" />
          </TouchableOpacity>
          <View style={{ height: "40%", width: "100%" }}>
            <AnimatedTimeComp />
          </View>
          <View>
            <Text style={styles.labl}>New Entry</Text>
            <TextInput style={styles.inputfild} value="17:21:31" />
          </View>
          <CustomAuthBtn title={"Save"} onClick={toggleModel} />
        </View>
      </CustomModel>
    </>
  );
};

export default DayActivityAdmin;

const styles = StyleSheet.create({
  datdiv: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dattxt: {
    marginLeft: h("1%"),
    fontSize: h("2.3%"),
  },
  mainActDiv: {
    width: w("90%"),
    height: h("45%"),
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    marginBottom: h("1%"),
  },
  contentdiv: {
    width: w("80%"),
    height: h("20%"),
    backgroundColor: inputBg,
    borderRadius: h("2%"),
  },
  activityinfo: {
    width: "93%",
    height: h("5%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  sechead: {
    fontSize: h("2.2%"),
    color: mainColor,
    textAlign: "center",
    marginBottom: h("1%"),
  },
  firhead: {
    fontSize: h("3.2%"),
    color: mainColor,
    textAlign: "center",
  },
  txtcont: {
    width: "100%",
    height: h("7%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  activityName: {
    fontSize: h("2.3%"),
    fontWeight: "700",
    marginLeft: 5,
  },
  activityTime: {
    fontSize: h("2.3%"),
    fontWeight: "600",
    marginRight: 5,
  },
  contina: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modelDiv: {
    width: "90%",
    height: h("60%"),
    backgroundColor: screenBg,
    display: "flex",
    justifyContent: "space-evenly",
    borderRadius: h("2%"),
    position: "relative",
  },
  closebtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: h("6%"),
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  labl: {
    marginBottom: h("1%"),
    marginLeft: h("1.3%"),
    fontSize: h("2.3%"),
    fontWeight: "500",
  },
  inputfild: {
    width: "95%",
    height: h("6%"),
    backgroundColor: inputBg,
    alignSelf: "center",
    borderRadius: h("1%"),
    paddingHorizontal: 10,
    fontSize: h("2.6%"),
  },
});
