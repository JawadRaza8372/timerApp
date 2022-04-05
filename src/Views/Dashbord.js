import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { w, h } from "react-native-responsiveness";
import { inputBg, mainColor, screenBg, stopColor } from "../AppColors";
import { MaterialIcons } from "@expo/vector-icons";
const Dashbord = ({ navigation }) => {
  const myData = [
    { user: "Jhon", status: "Working" },
    { user: "Gabrial", status: "Working" },
    { user: "William", status: "Inactive" },
    { user: "Oliver", status: "Break" },
    { user: "Thomas", status: "Working" },
  ];
  return (
    <SafeAreaView style={styles.mainDiv}>
      <Text style={styles.heading}>Dashbord</Text>
      <View style={styles.filldiv}>
        <View style={styles.contentShow}>
          <FlatList
            data={myData}
            keyExtractor={(item) => item.user}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("adminActivity")}
                  style={styles.usermain}
                >
                  <Text>{item.user}</Text>
                  <View style={styles.statusdiv}>
                    <MaterialIcons
                      name="timer"
                      color={
                        item.status === "Break"
                          ? stopColor
                          : item.status === "Inactive"
                          ? inputBg
                          : "black"
                      }
                      size={h("2.5%")}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color:
                          item.status === "Break"
                            ? stopColor
                            : item.status === "Inactive"
                            ? "grey"
                            : mainColor,
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashbord;

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentShow: {
    width: "85%",
    height: "90%",
    backgroundColor: inputBg,
    borderRadius: h("2%"),
  },
  usermain: {
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
  statusdiv: {
    width: "27.5%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});
