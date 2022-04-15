import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import { w, h } from "react-native-responsiveness";
import { screenBg, stopColor } from "../AppColors";
import CustomInput from "../Components/CustomInput";
import CustomLoginUser from "../Components/CustomLoginUser";
import CustomPaswdInput from "../Components/CustomPaswdInput";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../DataBase/Configer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUsers } from "../store/projectSlice";
const AddUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    Role: "User",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    addBy: isAuth.userid,
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

  const adduserfun = async () => {
    await db
      .collection("authSystem")
      .add(formData)
      .then((dat) => {
        console.log("done");
        reftch();
      });
    setformData({
      Role: "User",
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      addBy: isAuth.userid,
    });
  };

  const role1 = [
    { title: "Admin (Manager)", value: "Admin (Manager)" },
    { title: "Employe", value: "Employe" },
  ];
  const role2 = [{ title: "Employe", value: "Employe" }];
  const usercateg = isAuth.Role === "Admin" ? role1 : role2;
  return (
    <SafeAreaView style={styles.mainDiv}>
      <View style={styles.introdiv}>
        <Text style={styles.heading}>New User</Text>
        <Text style={styles.desc}>Fill in all the fields below</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inputs}>
          <View>
            <Text style={styles.labl}>Role</Text>

            <CustomLoginUser
              title={formData.Role}
              myData={usercateg}
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
              placeholder="Doe"
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
              placeholder="Jhon"
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
              placeholder="email@example.com"
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

          <CustomAuthBtn title="Add" onClick={adduserfun} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddUserScreen;

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
    width: w("95%"),
    alignSelf: "center",
    height: h("79%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  introdiv: {
    width: "100%",
    height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  desc: {
    fontSize: h("2.2%"),
    textAlign: "center",
  },
});
