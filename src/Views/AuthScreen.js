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
    await db
      .collection("DailyActivity")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          dispatch(setUserActivity({ usersActivity: [] }));
        } else {
          dispatch(
            setUserActivity({
              usersActivity: querySnapshot.docs.map((doc) => ({
                id: doc.id,
                createdAt: doc.data().createdAt,
                userid: doc.data().userid,
                activity: doc.data().activity,
              })),
            })
          );
        }
      });

    if (isAuth.Role === "Employe") {
      await db
        .collection("DailyActivity")
        .where("createdAt", "==", `${todayval}`)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            cresteNewdoc();
          } else {
            const newdata = querySnapshot.docs.filter(
              (doc) => doc.data().userid === isAuth.userid
            );
            if (newdata.length === 0) {
              cresteNewdoc();
            }
          }
        });
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
  const getTasks = async () => {
    db.collection("TaskMange")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("notasks");
        } else {
          dispatch(
            setTasks({
              tasks: querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().Title,
                value: doc.data().Value,
              })),
            })
          );
        }
      });
  };
  useEffect(() => {
    getData();
    getTasks();
    getEmployLoginData();
  }, []);
  const loginFunct = async (data) => {
    await db
      .collection("authSystem")
      .where("email", "==", `${data?.email}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("user does not exist");
        } else {
          querySnapshot.forEach((doc) => {
            if (doc.data().password === data?.password) {
              console.log("Auth Suceess");

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
              console.log("Wrong Credientials");
            }
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
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
