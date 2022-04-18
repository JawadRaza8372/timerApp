import { StyleSheet, Text, View, StatusBar, LogBox } from "react-native";
import MyStackNavig from "./src/AppNavigation/MyStackNavig";
import ActivityScreen from "./src/Views/ActivityScreen";
import AuthScreen from "./src/Views/AuthScreen";
import TimerScreen from "./src/Views/TimerScreen";
import { Provider, useDispatch } from "react-redux";
import { setUserActivity } from "./src/store/projectSlice";
import { store } from "./src/store";
import { db } from "./src/DataBase/Configer";
export default function App() {
  LogBox.ignoreLogs([
    "Setting a timer",
    "Can't perform a React state update on an unmounted component",
    "AsyncStorage has been extracted from react-native",
    "Cannot update a component",
  ]);
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
