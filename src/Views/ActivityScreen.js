import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { mainColor, screenBg } from "../AppColors";
import { w, h } from "react-native-responsiveness";
import DayActivity from "../Components/DayActivity";
import { useSelector } from "react-redux";
import UnAvilData from "../Components/UnAvilData";
const ActivityScreen = ({ navigation }) => {
  const { usersActivity } = useSelector((state) => state.project);
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);
  let mydatashow = usersActivity.filter((dat) => dat.userid === isAuth.userid);
  return (
    <SafeAreaView style={styles.mainDiv}>
      <Text style={styles.heading}>Activity</Text>
      <Text style={styles.username}>
        {isAuth.firstName} {isAuth.lastName}
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
});
