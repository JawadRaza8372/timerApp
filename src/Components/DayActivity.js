import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { w, h } from "react-native-responsiveness";
import { inputBg, mainColor } from "../AppColors";
import { color } from "react-native-reanimated";
const DayActivity = ({ date, activityArry }) => {
  const [actTime, setactTime] = useState({ hours: 0, mints: 0 });
  useEffect(() => {
    if (activityArry.length >= 2) {
      const check =
        new Date(
          `${date} ${activityArry[activityArry.length - 1].taskTime}`
        ).getTime() - new Date(`${date} ${activityArry[0].taskTime}`).getTime();
      const sec = 1000;
      const minut = sec * 60;
      const hour = minut * 60;
      const day = hour * 24;
      const textmint = Math.floor((check % hour) / minut);
      const texthour = Math.floor((check % day) / hour);
      setactTime({ hours: texthour, mints: textmint });
    }
  }, []);

  return (
    <View style={styles.mainActDiv}>
      <View style={styles.datdiv}>
        <Feather name="calendar" size={h("3.1%")} color="black" />
        <Text style={styles.dattxt}>{date}</Text>
      </View>
      <View style={styles.contentdiv}>
        {activityArry && (
          <ScrollView nestedScrollEnabled={true}>
            {activityArry.map((dat, index) => (
              <View key={index} style={styles.activityinfo}>
                <Text style={styles.activityName}>{dat.TaskName}</Text>
                <Text style={styles.activityTime}>{dat.taskTime}</Text>
              </View>
            ))}
          </ScrollView>
        )}
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
      {activityArry.length >= 2 && (
        <View style={styles.txtcont}>
          <Text style={styles.sechead}>Today’s total working time</Text>
          <Text style={styles.firhead}>
            {actTime.hours === 0
              ? ""
              : actTime.hours === 1
              ? `${actTime.hours} Hour `
              : `${actTime.hours} Hours `}
            {actTime.mints === 0 ? "" : `${actTime.mints} minutes`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DayActivity;

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
    overflow: "hidden",
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
  },
  activityTime: {
    fontSize: h("2.3%"),
    fontWeight: "600",
  },
});
