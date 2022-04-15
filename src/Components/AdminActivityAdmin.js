import { FontAwesome5, Entypo, Feather } from "@expo/vector-icons";
import CustomModel from "./CustomModel";
import CustomAuthBtn from "./CustomAuthBtn";
import { w, h } from "react-native-responsiveness";
import { inputBg, mainColor, screenBg } from "../AppColors";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import AnimatedTimeComp from "./AnimatedTimeComp";
import { db } from "../DataBase/Configer";
import { setUserActivity } from "../store/projectSlice";
import { useDispatch } from "react-redux";
const AdminActivityAdmin = ({
  TaskName,
  taskTime,
  docid,
  myindex,
  fullArry,
}) => {
  const [openModel, setopenModel] = useState(false);
  const [changetxt, setchangetxt] = useState(taskTime);
  //   console.log(index);
  let myArry = [];
  const dispatch = useDispatch();
  const toggleModel = () => {
    setopenModel(!openModel);
  };
  const refetch = async () => {
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
  };
  const activityManplt = async (value) => {
    await db
      .collection("DailyActivity")
      .doc(docid)
      .update({ activity: value })
      .then((doc) => {
        console.log("updated");
        refetch();
      });
  };
  const savEdited = async () => {
    await activityManplt(
      fullArry.map((obj, index) => {
        if (index === myindex) {
          return { ...obj, taskTime: changetxt };
        } else {
          return obj;
        }
      })
    );
    toggleModel();
  };
  const savDelted = async () => {
    await activityManplt(
      fullArry.filter((obj, index) => {
        return index !== myindex;
      })
    );
  };
  return (
    <>
      <View style={styles.activityinfo}>
        <TouchableOpacity onPress={savDelted} style={styles.contina}>
          <Entypo name="cross" size={h("3.8%")} color="black" />

          <Text style={styles.activityName}>{TaskName}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModel} style={styles.contina}>
          <Text style={styles.activityTime}>{taskTime}</Text>
          <FontAwesome5 name="edit" size={h("2.7%")} color="black" />
        </TouchableOpacity>
      </View>
      <CustomModel show={openModel} toggleModal={toggleModel}>
        <View style={styles.modelDiv}>
          <TouchableOpacity onPress={toggleModel} style={styles.closebtn}>
            <Entypo name="cross" size={h("3.8%")} color="black" />
          </TouchableOpacity>
          <View style={{ height: "40%", width: "100%" }}>
            <AnimatedTimeComp />
          </View>
          <View>
            <Text style={styles.labl}>New Entry</Text>
            <TextInput
              style={styles.inputfild}
              placeholder={"time"}
              value={changetxt}
              onChangeText={(text) => setchangetxt(text)}
            />
          </View>
          <CustomAuthBtn title={"Save"} onClick={savEdited} />
        </View>
      </CustomModel>
    </>
  );
};

export default AdminActivityAdmin;

const styles = StyleSheet.create({
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
  contina: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  activityName: {
    fontSize: h("2.3%"),
    fontWeight: "700",
    marginLeft: 5,
  },
  activityTime: {
    fontSize: h("2.3%"),
    fontWeight: "600",
    marginRight: 5,
  },
  modelDiv: {
    width: "90%",
    height: h("60%"),
    backgroundColor: screenBg,
    display: "flex",
    justifyContent: "space-evenly",
    borderRadius: h("2%"),
    position: "relative",
  },
  labl: {
    marginBottom: h("1%"),
    marginLeft: h("1.3%"),
    fontSize: h("2.3%"),
    fontWeight: "500",
  },
  inputfild: {
    width: "95%",
    height: h("6%"),
    backgroundColor: inputBg,
    alignSelf: "center",
    borderRadius: h("1%"),
    paddingHorizontal: 10,
    fontSize: h("2.6%"),
  },
  closebtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: h("6%"),
    height: h("6%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
