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
import moment from "moment";
const TimerScreen = ({ navigation }) => {
  const [ismodal, setismodal] = useState(false);
  const [selectedTask, setselectedTask] = useState("");
  const [continuing, setcontinuing] = useState(false);
  const [newSelecteddata, setnewSelecteddata] = useState({
    TaskName: "",
    taskTime: "",
  });
  const { tasks, todayActivity } = useSelector((state) => state.project);
  const { isAuth } = useSelector((state) => state.auth);
  const [fetchTodayDoc, setfetchTodayDoc] = useState({
    id: null,
    createdAt: null,
    activity: [],
  });
  const dispatch = useDispatch();
  const checkForDoc = async () => {
    var todayval = new Date().toDateString();
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
              gettodaydoc(doc.id);
            } else {
              console.log("notfound");
            }
          });
          // console.log("checking for data ", newdata.id);
        });
    }
  };
  const gettodaydoc = async (value) => {
    var ref = value ? value : todayActivity;
    await db
      .collection("DailyActivity")
      .doc(ref)
      .get()
      .then((doc) => {
        console.log("doc available");
        setfetchTodayDoc({
          id: doc.id,
          createdAt: doc.data().createdAt,
          activity: doc.data().activity,
        });
      });
  };
  useEffect(() => {
    checkForDoc();
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);

  const activityManplt = async () => {
    await db
      .collection("DailyActivity")
      .doc(todayActivity)
      .update({ activity: [...fetchTodayDoc.activity, newSelecteddata] })
      .then((doc) => console.log("updated"));
  };
  useEffect(() => {
    if (newSelecteddata.TaskName && newSelecteddata.taskTime) {
      activityManplt();
      gettodaydoc();
      setnewSelecteddata({ TaskName: "", taskTime: "" });
    }
  }, [newSelecteddata]);
  const startBtnFunct = async () => {
    if (selectedTask) {
      var today = new Date().toLocaleTimeString();
      await setnewSelecteddata({ TaskName: selectedTask, taskTime: today });
    } else {
      alert("Please select the task");
    }
  };
  const validatebtnFunction = () => {
    startBtnFunct();
    setismodal(!ismodal);
  };
  useEffect(() => {
    if (fetchTodayDoc.activity.length > 0) {
      var taskname =
        fetchTodayDoc.activity[fetchTodayDoc.activity.length - 1].TaskName;
      setselectedTask(taskname);
      if (taskname) {
        var checkingtask = taskname.includes("end_");
        if (checkingtask) {
          if (taskname === "end_break") {
            setcontinuing(true);
            setselectedTask("working");
          } else {
            setcontinuing(false);
          }
        } else {
          setcontinuing(true);
        }
      }
      if (fetchTodayDoc.activity.length > 1) {
        const check =
          new Date(
            `${fetchTodayDoc.createdAt} ${
              fetchTodayDoc.activity[fetchTodayDoc.activity.length - 1].taskTime
            }`
          ).getTime() -
          new Date(
            `${fetchTodayDoc.createdAt} ${fetchTodayDoc.activity[0].taskTime}`
          ).getTime();
        console.log("checking two wala", check);
      }
      {
        const check =
          new Date(
            `${fetchTodayDoc.createdAt} ${
              fetchTodayDoc.activity[fetchTodayDoc.activity.length - 1].taskTime
            }`
          ).getTime() - new Date().getTime();
        console.log("checking one Wla", check);
      }
    }
  }, [fetchTodayDoc]);
  // const check = new Date();
  // console.log("date1", check.toDateString());
  // console.log("date1", check.toLocaleDateString());
  // console.log("date1", check.getDate());
  if (todayActivity) {
    return (
      <>
        <SafeAreaView style={styles.mainDiv}>
          <View style={styles.introdiv}>
            <Text style={styles.head}>Timer</Text>
            <View style={styles.datdiv}>
              <Feather name="calendar" size={h("3.1%")} color="black" />
              <Text style={styles.dattxt}>
                {fetchTodayDoc.createdAt
                  ? new Date(fetchTodayDoc.createdAt).toDateString()
                  : new Date().toDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.activitysel}>
            <CustomLoginUser
              title={
                selectedTask ? selectedTask.replace("_", " ") : "Select Task"
              }
              istimer={true}
              myData={tasks}
              selectionFun={(dat) => setselectedTask(dat)}
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
            {continuing ? (
              <CustomAuthBtn
                istimer={true}
                title={"Stop"}
                bgColor={stopColor}
                onClick={() => setismodal(!ismodal)}
              />
            ) : (
              <CustomAuthBtn
                istimer={true}
                title={"Start"}
                bgColor={mainColor}
                onClick={startBtnFunct}
              />
            )}
          </View>
          <View style={styles.txtcont}>
            <Text style={styles.sechead}>Today’s total working time</Text>
            <Text style={styles.firhead}>12:41:33</Text>
          </View>
          <CustomModel show={ismodal} toggleModal={() => setismodal(!ismodal)}>
            <View style={styles.stopdiv}>
              <Text style={styles.head}>Stop Reason</Text>
              <CustomLoginUser
                title={
                  selectedTask ? selectedTask.replace("_", " ") : "Select One"
                }
                istimer={true}
                myData={tasks.filter((dat) => dat.value !== selectedTask)}
                selectionFun={(dat) => setselectedTask(dat)}
              />
              <CustomAuthBtn
                title={"Validate"}
                onClick={validatebtnFunction}
                istimer={true}
              />
            </View>
          </CustomModel>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <>
        <SafeAreaView style={styles.mainDiv}>
          <Text style={styles.head}>Laoding</Text>
        </SafeAreaView>
      </>
    );
  }
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
