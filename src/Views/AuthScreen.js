import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { screenBg } from "../AppColors";
import AdminLogin from "../Components/AdminLogin";
import EmployLogin from "../Components/EmployLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../DataBase/Configer";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/authSlice";
import {
  setLayout,
  setTasks,
  setTodayActivity,
  setUserActivity,
  setUsers,
} from "../store/projectSlice";
const AuthScreen = ({ navigation }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { usersActivity } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  const cresteNewdoc = async () => {
    await db
      .collection("DailyActivity")
      .add({
        createdAt: new Date().toDateString(),
        activity: [],
        userid: isAuth.userid,
      })
      .then((doc) => {
        console.log("document created");
        dispatch(setTodayActivity({ todayActivity: doc.id }));
      });
  };
  const checkForDoc = async () => {
    var todayval = new Date().toDateString();
    if (isAuth.Role === "Employe") {
      const checkTodayDoc = usersActivity.filter(
        (dat) => dat.userid === isAuth.userid && dat.createdAt === todayval
      );
      if (checkTodayDoc.length === 0) {
        cresteNewdoc();
      }
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("TimerLayout");
      dispatch(setLayout({ loginLayout: `${value}` }));
    } catch (e) {
      // error reading value
    }
  };

  const getEmployLoginData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("timerEmployList");
      if (
        jsonValue !== null &&
        jsonValue !== undefined &&
        jsonValue !== "null" &&
        jsonValue !== "undefined" &&
        jsonValue !== ""
      ) {
        var newdata = JSON.parse(jsonValue);
        dispatch(setUsers({ users: newdata }));
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
    getEmployLoginData();
  }, []);
  const loginFunct = async (data) => {
    if (data.email && data.password) {
      if (data.email.length >= 5) {
        if (data.password.length >= 5) {
          await db
            .collection("authSystem")
            .where("email", "==", `${data?.email}`)
            .onSnapshot((snapshot) => {
              if (snapshot.empty) {
                alert("User does not exist.");
              } else {
                snapshot.forEach((doc) => {
                  if (doc.data().password === data?.password) {
                    dispatch(
                      setAuth({
                        auth: {
                          userid: doc.id,
                          email: doc.data().email,
                          lastName: doc.data().lastName,
                          firstName: doc.data().firstName,
                          Role: doc.data().Role,
                        },
                      })
                    );
                    if (doc.data().Role === "Employe") {
                      navigation.replace("Client");
                    } else {
                      navigation.replace("Admin");
                    }
                  } else {
                    alert("Wrong Credientials");
                  }
                });
              }
            });
          await db
            .collection("authSystem")
            .where("email", "==", `${data?.email}`)
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.empty) {
                alert("User does not exist.");
              } else {
                querySnapshot.forEach((doc) => {
                  if (doc.data().password === data?.password) {
                    dispatch(
                      setAuth({
                        auth: {
                          userid: doc.id,
                          email: doc.data().email,
                          lastName: doc.data().lastName,
                          firstName: doc.data().firstName,
                          Role: doc.data().Role,
                        },
                      })
                    );
                    if (doc.data().Role === "Employe") {
                      navigation.replace("Client");
                    } else {
                      navigation.replace("Admin");
                    }
                  } else {
                    alert("Wrong Credientials");
                  }
                });
              }
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
              alert(error.message);
            });
        } else {
          alert("Please Enter Password of atleast 5 letters");
        }
      } else {
        alert("Please Enter valid Email");
      }
    }
  };
  const { layout } = useSelector((state) => state.project);
  useEffect(() => {
    if (isAuth) {
      checkForDoc();
    }
  }, [isAuth]);

  const renderlayout = () => {
    if (layout === "Kiosk") {
      return (
        <EmployLogin
          onOther={() => dispatch(setLayout({ loginLayout: "" }))}
          onSubmit={loginFunct}
        />
      );
    } else {
      return <AdminLogin onSubmit={loginFunct} />;
    }
  };

  return <SafeAreaView style={styles.mainDiv}>{renderlayout()}</SafeAreaView>;
};

export default AuthScreen;

const styles = StyleSheet.create({
  mainDiv: {
    width: "100%",
    height: "100%",
    backgroundColor: screenBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
