import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { mainColor, screenBg, stopColor } from "../AppColors";
import CircleTimer from "react-native-circle-timer";
import CustomLoginUser from "../Components/CustomLoginUser";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { w, h } from "react-native-responsiveness";
import { Feather } from "@expo/vector-icons";
import CustomModel from "../Components/CustomModel";
import AnimatedTimeComp from "../Components/AnimatedTimeComp";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../DataBase/Configer";
import { setTodayActivity } from "../store/projectSlice";
const TimerScreen = ({ navigation }) => {
  const [ismodal, setismodal] = useState(false);
  const [selectedTask, setselectedTask] = useState("");
  const { tasks, todayActivity } = useSelector((state) => state.project);
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(tasks);
  console.log("checking for activity id =>", todayActivity, " <=====");
  // console.log("now", today);
  const checkForDoc = async () => {
    var todayval = new Date().toLocaleDateString();
    console.log(todayval);
    if (isAuth.Role === "Employe") {
      await db
        .collection("DailyActivity")
        .where("createdAt", "==", todayval)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            if (doc.data().userid === isAuth.userid) {
              console.log("found");
              dispatch(setTodayActivity({ todayActivity: doc.id }));
            } else {
              console.log("notfound");
            }
          });
          // console.log("checking for data ", newdata.id);
        });
    }
  };
  useEffect(() => {
    checkForDoc();
  }, []);

  const activityManplt = () => {};
  const startBtnFunct = () => {
    if (selectedTask === "working") {
      //time when work started
      const today = new Date().toLocaleTimeString();
    } else if (selectedTask === "break") {
      //time when break started
      const today = new Date().toLocaleTimeString();
    }
  };
  const endBtnFunct = () => {
    if (selectedTask === "working") {
      //time when work end
      const today = new Date().toLocaleTimeString();
    } else if (selectedTask === "break") {
      //time when break end
      const today = new Date().toLocaleTimeString();
    }
  };
  return (
    <SafeAreaView style={styles.mainDiv}>
      <View style={styles.introdiv}>
        <Text style={styles.head}>Timer</Text>
        <View style={styles.datdiv}>
          <Feather name="calendar" size={h("3.1%")} color="black" />
          <Text style={styles.dattxt}>08/03/2022</Text>
        </View>
      </View>

      <View style={styles.activitysel}>
        <CustomLoginUser
          title={"Select Task"}
          istimer={true}
          myData={tasks}
          selectionFun={(dat) => console.log(dat)}
        />
      </View>
      <View
        style={{
          height: h("40%"),
          width: "100%",
          justifyContent: "center",
        }}
      >
        <AnimatedTimeComp />
      </View>
      <View style={styles.activitysel}>
        <CustomAuthBtn
          istimer={true}
          title={"Start"}
          bgColor={mainColor}
          onClick={() => setismodal(!ismodal)}
        />
      </View>
      <View style={styles.txtcont}>
        <Text style={styles.sechead}>Today’s total working time</Text>
        <Text style={styles.firhead}>7 hr 45 mins</Text>
      </View>
      <CustomModel show={ismodal} toggleModal={() => setismodal(!ismodal)}>
        <View style={styles.stopdiv}>
          <Text style={styles.head}>Stop Reason</Text>
          <CustomLoginUser title={"Break"} istimer={true} />
          <CustomAuthBtn
            title={"Validate"}
            onClick={() => setismodal(!ismodal)}
            istimer={true}
          />
        </View>
      </CustomModel>
    </SafeAreaView>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  mainDiv: {
    width: "100%",
    height: "100%",
    backgroundColor: screenBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  introdiv: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  activitysel: {
    width: "70%",
    alignSelf: "center",
  },
  head: {
    fontSize: h("4%"),
    textAlign: "center",
    marginBottom: h("2%"),
    fontWeight: "bold",
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
  stopdiv: {
    width: "90%",
    height: "30%",
    backgroundColor: screenBg,
    borderRadius: h("2%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
});
