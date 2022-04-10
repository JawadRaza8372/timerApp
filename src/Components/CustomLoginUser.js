import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { inputBg, mainColor, screenBg } from "../AppColors";
import { w, h } from "react-native-responsiveness";
import CustomModel from "./CustomModel";
const CustomLoginUser = ({ istimer, title, myData, selectionFun }) => {
  const [showDrop, setshowDrop] = useState(false);

  // const myData = [
  //   { title: "jhon" },
  //   { title: "jhonson" },
  //   { title: "ujhon" },
  //   { title: "kin jhon" },
  //   { title: "benjem jhon" },
  //   { title: "him jhon" },
  //   { title: "hoy jhon" },
  //   { title: "bore jhon" },
  // ];
  return (
    <>
      <TouchableOpacity
        onPress={() => setshowDrop(!showDrop)}
        style={{
          ...styles.customInptdiv,
          width: istimer ? "90%" : w("88%"),
          position: "relative",
        }}
      >
        <View style={styles.custminp}>
          <Text>{title}</Text>
        </View>
        <View style={styles.inpBtn}>
          {showDrop ? (
            <AntDesign name="caretup" size={h("2.3%")} color={mainColor} />
          ) : (
            <AntDesign name="caretdown" size={h("2.3%")} color={mainColor} />
          )}
        </View>
      </TouchableOpacity>
      <CustomModel show={showDrop} toggleModal={() => setshowDrop(!showDrop)}>
        <View style={styles.dropContain}>
          <View style={{ width: "100%", height: h("7%") }}>
            <Text
              style={{
                fontSize: h("3%"),
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Choose One
            </Text>
          </View>
          <ScrollView>
            {myData &&
              myData.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    selectionFun(item.value);
                    setshowDrop(!showDrop);
                  }}
                  key={index}
                  style={styles.activityinfo}
                >
                  <Text style={styles.activityName}>{item.title}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </CustomModel>
      {/* {showDrop && (
        <View style={{ ...styles.dropdivv, width: istimer ? "90%" : w("88%") }}>
          <ScrollView>
            {myData &&
              myData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.activityinfo,
                    width: istimer ? w("70%") : w("88%"),
                  }}
                >
                  <Text style={styles.activityName}>{item.title}</Text>
                </View>
              ))}
          </ScrollView>  <FlatList
              data={myData}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
               <Text>hy</Text>
              )}
            /> 
        </View>
      )}  */}
    </>
  );
};

export default CustomLoginUser;

const styles = StyleSheet.create({
  customInptdiv: {
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
    width: "86%",
    height: "100%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  inpBtn: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "8%",
  },
  activityinfo: {
    width: "90%",
    height: h("6%"),
    marginBottom: h("1%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    borderBottomColor: "lightgrey",
    alignSelf: "center",
    borderBottomWidth: 1,
  },
  activityTime: {
    fontSize: h("2.3%"),
    fontWeight: "600",
  },
  dropdivv: {
    position: "absolute",
    top: h("7.8%"),
    height: h("20%"),
    backgroundColor: inputBg,
    zIndex: 1000,
    borderRadius: h("1%"),
    overflow: "hidden",
    alignSelf: "center",
    paddingHorizontal: w("2%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  dropContain: {
    backgroundColor: screenBg,
    width: w("90%"),
    height: h("40%"),
    borderRadius: h("2%"),
    paddingVertical: h("2%"),
  },
  activityName: {
    fontSize: h("3%"),
    fontWeight: "600",
  },
});
