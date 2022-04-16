import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { w, h } from "react-native-responsiveness";
import { screenBg, stopColor } from "../AppColors";
import CustomInput from "../Components/CustomInput";
import CustomLoginUser from "../Components/CustomLoginUser";
import CustomPaswdInput from "../Components/CustomPaswdInput";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { db } from "../DataBase/Configer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../store/projectSlice";
const UpdateUserScreen = ({ route, navigation }) => {
  const { userid } = route.params;
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    Role: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("timerEmployList", jsonValue);
      console.log("");
    } catch (e) {
      // saving error
    }
  };
  const reftch = async () => {
    await db
      .collection("authSystem")
      .where("addBy", "==", `${isAuth.userid}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("no users created by this user");
        } else {
          dispatch(
            setUsers({
              users: querySnapshot.docs.map((doc) => ({
                userid: doc.id,
                value: doc.data().email,
                title: doc.data().firstName + " " + doc.data().lastName,
                Role: doc.data().Role,
              })),
            })
          );
          storeData(
            querySnapshot.docs.map((doc) => ({
              userid: doc.id,
              value: doc.data().email,
              title: doc.data().firstName + " " + doc.data().lastName,
              Role: doc.data().Role,
            }))
          );
          // querySnapshot.forEach((doc) => {
          //   console.log(doc.id);
          // });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  const getuser = async () => {
    await db
      .collection("authSystem")
      .doc(userid)
      .get()
      .then((dat) => {
        setformData(dat.data());
      });
  };
  useEffect(() => {
    getuser();
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);
  const updateFunct = async () => {
    await db
      .collection("authSystem")
      .doc(userid)
      .update(formData)
      .then((doc) => {
        console.log("doc updated");
        reftch();
        alert("User Information Updated.");
      });
  };
  const deltFunc = async () => {
    await db
      .collection("authSystem")
      .doc(userid)
      .delete()
      .then(() => {
        console.log("done");
        reftch();
        alert("User Deleted Successfully.");
      });
  };
  return (
    <SafeAreaView style={styles.mainDiv}>
      <View style={styles.introdiv}>
        <Text style={styles.heading}>User Details</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            console.log("clicked");
          }}
          style={styles.backbtn}
        >
          <Entypo name="chevron-left" size={h("5%")} color="black" />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inputs}>
          <View>
            <Text style={styles.labl}>Role</Text>

            <CustomLoginUser
              title={formData.Role}
              myData={[
                { title: "Admin (Manager)", value: "Admin (Manager)" },
                { title: "Employe", value: "Employe" },
              ]}
              selectionFun={(dat) =>
                setformData((prevalue) => {
                  return {
                    ...prevalue,
                    Role: dat,
                  };
                })
              }
            />
          </View>
          <View>
            <Text style={styles.labl}>Last Name</Text>

            <CustomInput
              placeholder={"Doe"}
              value={formData.lastName}
              onChange={(text) =>
                setformData((prevalue) => {
                  return {
                    ...prevalue,
                    lastName: text,
                  };
                })
              }
            />
          </View>
          <View>
            <Text style={styles.labl}>First Name</Text>

            <CustomInput
              placeholder={"Jhon"}
              value={formData.firstName}
              onChange={(text) =>
                setformData((prevalue) => {
                  return {
                    ...prevalue,
                    firstName: text,
                  };
                })
              }
            />
          </View>
          <View>
            <Text style={styles.labl}>Email</Text>

            <CustomInput
              placeholder={"email@exapmle.com"}
              value={formData.email}
              onChange={(text) =>
                setformData((prevalue) => {
                  return {
                    ...prevalue,
                    email: text,
                  };
                })
              }
            />
          </View>
          <View>
            <Text style={styles.labl}>Password</Text>

            <CustomPaswdInput
              value={formData.password}
              onChange={(text) =>
                setformData((prevalue) => {
                  return {
                    ...prevalue,
                    password: text,
                  };
                })
              }
            />
          </View>

          <CustomAuthBtn title="Update" onClick={updateFunct} />
          <CustomAuthBtn
            bgColor={stopColor}
            title="Delete"
            onClick={deltFunc}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateUserScreen;

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
  labl: {
    marginBottom: h("1%"),
    fontSize: h("2.3%"),
    fontWeight: "500",
  },
  inputs: {
    width: w("80%"),
    alignSelf: "center",
    height: h("80%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  introdiv: {
    width: "90%",
    height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    position: "relative",
  },
  desc: {
    fontSize: h("2.2%"),
    textAlign: "center",
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
