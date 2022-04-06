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
import { inputBg, mainColor } from "../AppColors";
import { w, h } from "react-native-responsiveness";
const CustomLoginUser = ({ istimer, title }) => {
  const [showDrop, setshowDrop] = useState(false);
  const myData = [
    { title: "jhon" },
    { title: "jhonson" },
    { title: "ujhon" },
    { title: "kin jhon" },
    { title: "ben jhon" },
  ];
  return (
    <>
      <View
        style={{
          ...styles.customInptdiv,
          width: istimer ? "90%" : w("88%"),
          position: "relative",
        }}
      >
        <View style={styles.custminp}>
          <Text>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.inpBtn}
          onPress={() => setshowDrop(!showDrop)}
        >
          {showDrop ? (
            <AntDesign name="caretup" size={h("2.3%")} color={mainColor} />
          ) : (
            <AntDesign name="caretdown" size={h("2.3%")} color={mainColor} />
          )}
        </TouchableOpacity>
      </View>
      {showDrop && (
        <View style={{ ...styles.dropdivv, width: istimer ? "90%" : w("90%") }}>
          <ScrollView>
            {myData &&
              myData.map((item, index) => (
                <View key={index} style={styles.activityinfo}>
                  <Text style={styles.activityName}>{item.title}</Text>
                </View>
              ))}
          </ScrollView>

          {/* <FlatList
              data={myData}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
               
              )}
            /> */}
        </View>
      )}
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
  activityTime: {
    fontSize: h("2.3%"),
    fontWeight: "600",
  },
  dropdivv: {
    position: "absolute",
    top: h("7.5%"),
    left: 0,
    height: h("20%"),
    backgroundColor: inputBg,
    zIndex: 1000,
    borderRadius: h("1%"),
    overflow: "hidden",
  },
});
