import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { w, h } from "react-native-responsiveness";
import { inputBg, mainColor, screenBg, stopColor } from "../AppColors";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { LoadingData } from "../Components/UnAvilData";
const Dashbord = ({ navigation }) => {
  const { users } = useSelector((state) => state.project);

  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);
  if (isAuth === null) {
    navigation.replace("Auth");
    return null;
  } else {
    return (
      <SafeAreaView style={styles.mainDiv}>
        <Text style={styles.heading}>Dashbord</Text>
        <View style={styles.filldiv}>
          <View style={styles.contentShow}>
            {users.length > 0 ? (
              <FlatList
                data={users}
                keyExtractor={(item) => item.userid}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("adminActivity", {
                          userid: item.userid,
                        })
                      }
                      style={styles.usermain}
                    >
                      <Text>{item.value}</Text>
                    </TouchableOpacity>
                  </>
                )}
              />
            ) : (
              <LoadingData />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
