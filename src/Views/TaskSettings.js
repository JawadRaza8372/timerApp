import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { w, h } from "react-native-responsiveness";
import { inputBg, screenBg, mainColor } from "../AppColors";
import CustomInput from "../Components/CustomInput";
import {
  Entypo,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomModel from "../Components/CustomModel";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoginUser from "../Components/CustomLoginUser";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setLayout } from "../store/projectSlice";
import { db } from "../DataBase/Configer";
import { LoadingData } from "../Components/UnAvilData";
import { setAuth } from "../store/authSlice";
const TaskSettings = ({ navigation }) => {
  const [openModel, setopenModel] = useState(false);
  const [taskId, settaskId] = useState("");
  const [lloginLayout, setlloginLayout] = useState("");
  const [editTask, seteditTask] = useState("");
  const { users, tasks, layout } = useSelector((state) => state.project);
  const { isAuth } = useSelector((state) => state.auth);
  const [taskAdd, settaskAdd] = useState("");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("TimerLayout");
      if (value === "Kiosk") {
        setlloginLayout(value);
        dispatch(setLayout({ loginLayout: "Kiosk" }));
      } else {
        setlloginLayout("");
        dispatch(setLayout({ loginLayout: "" }));
      }
    } catch (e) {
      // error reading value
    }
  };
  const logoutAdmin = async () => {
    await AsyncStorage.removeItem("timerAuth");
    dispatch(setAuth({ auth: null }));
  };
  const storeData = async () => {
    try {
      console.log("thisrun");
      if (lloginLayout) {
        dispatch(setLayout({ loginLayout: lloginLayout }));
      }
      await AsyncStorage.setItem("TimerLayout", lloginLayout);
      console.log("thisend");
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);
  useEffect(() => {
    storeData();
  }, [lloginLayout]);

  const toggleModelf = () => {
    setopenModel(!openModel);
  };
  const addTaskFunction = async () => {
    if (taskAdd && taskAdd !== null && taskAdd !== "" && taskAdd.length >= 3) {
      const value = taskAdd.replace(" ", "_").toLowerCase();
      await db
        .collection("TaskMange")
        .add({
          Title: taskAdd.charAt(0).toUpperCase() + taskAdd.slice(1),
          Value: value,
        })
        .then((doc) => {
          settaskAdd("");
          alert("Task Added");
        });
    } else {
      alert("Please enter task name of atleast 3 letters");
    }
  };
  const editTaskFunct = async () => {
    await db
      .collection("TaskMange")
      .doc(taskId)
      .update({ Title: editTask })
      .then(() => {
        toggleModelf();
        alert("Task Updated");
      });
  };
  if (!isAuth) {
    navigation.replace("Auth");
    return null;
  } else {
    return (
      <>
        <SafeAreaView style={styles.mainDiv}>
          <View style={styles.introdiv}>
            <Text style={styles.heading}>Parameters</Text>
            <TouchableOpacity onPress={logoutAdmin} style={styles.backbtn}>
              <MaterialCommunityIcons
                name="logout"
                size={h("5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.filldiv}>
              <View style={styles.inputs}>
                <Text style={styles.litheadig}>Tasks</Text>
                <View style={styles.tasksCont}>
                  <ScrollView>
                    {tasks.length > 0 ? (
                      tasks.map((dat) => (
                        <TouchableOpacity
                          onPress={() => {
                            seteditTask(dat.title);
                            settaskId(dat.id);
                            toggleModelf();
                          }}
                          style={styles.tasks}
                          key={dat.id}
                        >
                          <Text>{dat.title}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <LoadingData />
                    )}

                    <View style={styles.addtasks}>
                      <TextInput
                        placeholder="Enter New Task"
                        style={styles.myinput}
                        value={taskAdd}
                        onChangeText={(text) => settaskAdd(text)}
                      />
                      <TouchableOpacity
                        onPress={addTaskFunction}
                        style={styles.addbtnn}
                      >
                        <Entypo name="plus" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
                <View>
                  <Text style={styles.litheadig}>Email</Text>

                  <CustomInput
                    placeholder="email@example.com"
                    value={isAuth ? isAuth.email : ""}
                  />
                </View>
                <View>
                  <Text style={styles.litheadig}>Login Type</Text>
                  <CustomLoginUser
                    title={lloginLayout === "" ? "Default" : "Kiosk"}
                    myData={[
                      { title: "Default", value: "" },
                      { title: "Kiosk", value: "Kiosk" },
                    ]}
                    selectionFun={(dat) => setlloginLayout(dat)}
                  />
                </View>
              </View>
              {isAuth !== null && isAuth?.Role === "Admin (Manager)" && (
                <View style={styles.subscriptiondiv}>
                  <Text style={styles.litheadig}>
                    Informations about your subscription
                  </Text>
                  <View style={styles.contentDiv}>
                    <View style={{ width: "100%" }}>
                      <View style={styles.tasks}>
                        <Text>Your subscription is active</Text>
                      </View>
                      <View style={styles.tasks}>
                        <Text>Number of users : {`${users.length}`}/10</Text>
                      </View>
                      <View style={styles.tasks}>
                        <Text>
                          Your role : {isAuth ? `${isAuth.Role}` : ""}
                        </Text>
                      </View>
                    </View>
                    <CustomAuthBtn
                      title={"Change Subscription"}
                      onClick={() => navigation.navigate("Subscription")}
                    />
                  </View>
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
        <CustomModel show={openModel} toggleModal={toggleModelf}>
          <View style={styles.modelDiv}>
            <View style={styles.introdiv}>
              <Text style={styles.heading}>Task Parameters</Text>
              <TouchableOpacity onPress={toggleModelf} style={styles.backbtn}>
                <Entypo name="chevron-left" size={h("5%")} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.litheadig}>Task</Text>

              <CustomInput
                placeholder={"Task Name"}
                value={editTask}
                onChange={(text) => seteditTask(text)}
              />
            </View>
            <View style={styles.btnsDiv} />
          </View>
          <View style={styles.btndiv}>
            <CustomAuthBtn title="Update" onClick={editTaskFunct} />
          </View>
        </CustomModel>
      </>
    );
  }
};

export default TaskSettings;

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
    position: "relative",
  },
  subscriptiondiv: {
    width: "100%",
    height: h("35%"),
    // backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    // position: "absolute",
    // bottom: 0,
  },
  inputs: {
    width: w("95%"),
    alignSelf: "center",
    height: h("49%"),
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    // flexDirection: "column",
  },
  tasksCont: {
    width: w("88%"),
    height: h("19%"),
    backgroundColor: inputBg,
    alignSelf: "center",
    borderRadius: h("2%"),
    marginBottom: h("2%"),
  },
  tasks: {
    width: w("80%"),
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
  addtasks: {
    width: "90%",
    alignSelf: "center",
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contentDiv: {
    width: w("88%"),
    height: "77%",
    alignSelf: "center",
    backgroundColor: inputBg,
    borderRadius: h("2%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  litheadig: {
    fontSize: h("2.3%"),
    fontWeight: "500",
    marginBottom: h("1%"),
    textAlign: "left",
    width: "95%",
  },
  modelDiv: {
    width: "100%",
    height: "80%",
    backgroundColor: screenBg,
    paddingHorizontal: w("2%"),
  },
  btndiv: {
    width: "100%",
    height: "20%",
    backgroundColor: screenBg,
    paddingHorizontal: w("2%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  introdiv: {
    width: "95%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    position: "relative",
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
  myinput: {
    flex: 1,
    height: "100%",
  },
  addbtnn: {
    width: w("10%"),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnsDiv: {
    width: "100%",
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  remberbtn: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  emptybox: {
    width: h("2%"),
    height: h("2%"),
    borderRadius: h("4%"),
    backgroundColor: inputBg,
    overflow: "hidden",
    marginRight: h("1%"),
  },
  active: { backgroundColor: mainColor },
});
