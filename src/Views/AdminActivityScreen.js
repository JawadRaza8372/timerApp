import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { mainColor, screenBg } from "../AppColors";
import { w, h } from "react-native-responsiveness";
import DayActivity from "../Components/DayActivity";
import { Entypo } from "@expo/vector-icons";
import DayActivityAdmin from "../Components/DayActivityAdmin";
import Svg, { Circle, SvgXml } from "react-native-svg";

const AdminActivityScreen = ({ navigation }) => {
  const mydat = [{ key: "1" }, { key: "2" }, { key: "3" }, { key: "4" }];

  return (
    <SafeAreaView style={styles.mainDiv}>
      <View style={styles.headingdiv}>
        <Text style={styles.heading}>Activity</Text>

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
      <TouchableOpacity onPress={() => navigation.navigate("UpdateUserAdmin")}>
        <Text style={styles.username}>Jhon Doe</Text>
      </TouchableOpacity>

      <FlatList
        data={mydat}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <DayActivityAdmin />}
      />
    </SafeAreaView>
  );
};

export default AdminActivityScreen;

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
  username: {
    fontSize: h("2.6%"),
    fontWeight: "bold",
    textAlign: "center",
    color: mainColor,
    marginBottom: h("1.5%"),
  },
  headingdiv: {
    width: "95%",
    alignSelf: "center",
    position: "relative",
  },
  backbtn: {
    height: "100%",
    width: h("5.5%"),
    position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
