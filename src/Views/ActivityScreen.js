import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { mainColor, screenBg } from "../AppColors";
import { w, h } from "react-native-responsiveness";
import DayActivity from "../Components/DayActivity";
import { useDispatch, useSelector } from "react-redux";
import UnAvilData from "../Components/UnAvilData";
import { setAuth } from "../store/authSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ActivityScreen = ({ navigation }) => {
  const { usersActivity } = useSelector((state) => state.project);
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);
  const dispatch = useDispatch();
  const logoutFun = () => {
    dispatch(setAuth({ auth: null }));
  };

  if (isAuth !== null && isAuth) {
    let mydatashow =
      isAuth !== null &&
      isAuth?.userid &&
      usersActivity.length > 0 &&
      usersActivity.filter((dat) => dat.userid === isAuth?.userid);
    return (
      <SafeAreaView style={styles.mainDiv}>
        <View style={styles.haddiv}>
          <Text style={styles.heading}>Activity</Text>
          <TouchableOpacity style={styles.backbtn} onPress={logoutFun}>
            <MaterialCommunityIcons
              name="logout"
              size={h("5%")}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>
          {isAuth?.firstName} {isAuth?.lastName}
        </Text>
        {mydatashow.length > 0 ? (
          <FlatList
            data={mydatashow}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DayActivity date={item.createdAt} activityArry={item.activity} />
            )}
          />
        ) : (
          <UnAvilData />
        )}
      </SafeAreaView>
    );
  } else {
    navigation.replace("Auth");
    return null;
  }
};

export default ActivityScreen;

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
  nofounddiv: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  haddiv: {
    width: "85%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
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
