import { StyleSheet, Text, View, StatusBar, LogBox } from "react-native";
import MyStackNavig from "./src/AppNavigation/MyStackNavig";
import ActivityScreen from "./src/Views/ActivityScreen";
import AuthScreen from "./src/Views/AuthScreen";
import TimerScreen from "./src/Views/TimerScreen";
import { Provider } from "react-redux";
import { store } from "./src/store";
export default function App() {
  LogBox.ignoreLogs([
    "Setting a timer",
    "Can't perform a React state update on an unmounted component",
    "AsyncStorage has been extracted from react-native",
  ]);
  // db.collection("loans").onSnapshot((snapshot) => {
  //   setCount(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
  // });
  // await db
  //   .collection("users")
  //   .doc(`${myDoc?.id}`)
  //   .update({
  //     ...myDoc?.data,
  //     password: newPassword,
  //   })
  //   .then(() => {
  //     AlertFunction("Updated Successfully", "Password has been updated");
  //   });
  //  await db
  //   .collection("authSystem")
  //   .where("email", "==", `${loginInfo?.email}`)
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data().password === loginInfo?.password) {
  //  // doc.data();

  //
  //       } else {
  //       }
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error getting documents: ", error);
  //   });
  return (
    <Provider store={store}>
      <>
        <StatusBar />
        <MyStackNavig />
      </>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
