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
import { Entypo } from "@expo/vector-icons";
import DayActivityAdmin from "../Components/DayActivityAdmin";
import { useSelector } from "react-redux";
const AdminActivityScreen = ({ route, navigation }) => {
  const { usersActivity, users } = useSelector((state) => state.project);
  const { userid } = route.params;
  const curentUser = userid && users.filter((dat) => dat.userid === userid);
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UpdateUserAdmin", { userid: userid })
        }
      >
        <Text style={styles.username}>{curentUser[0].value}</Text>
      </TouchableOpacity>

      <FlatList
        data={usersActivity.filter((dat) => dat.userid === userid)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DayActivityAdmin
            date={item.createdAt}
            docid={item.id}
            activityArry={item.activity}
          />
        )}
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
