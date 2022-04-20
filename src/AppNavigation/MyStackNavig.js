import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomBottomTab from "./CustomBottomTab";
import AuthScreen from "../Views/AuthScreen";
import CustomBottomTabAdmin from "./CustomBottomTabAdmin";
import AdminActivityScreen from "../Views/AdminActivityScreen";
import UpdateUserScreen from "../Views/UpdateUserScreen";
import MySubscription from "../Views/MySubscription";
import { useEffect } from "react";
import { db } from "../DataBase/Configer";
import { setUserActivity, setTasks } from "../store/projectSlice";
import { useDispatch } from "react-redux";
const Stack = createStackNavigator();
export default function MyStackNavig() {
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection("TaskMange").onSnapshot((snapshot) => {
      dispatch(
        setTasks({
          tasks: snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().Title,
            value: doc.data().Value,
            isShow: doc.data().isShow,
          })),
        })
      );
    });
    db.collection("DailyActivity")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          setUserActivity({
            usersActivity: snapshot.docs
              .map((doc) => ({
                id: doc.id,
                createdAt: doc.data().createdAt,
                userid: doc.data().userid,
                activity: doc.data().activity,
              }))
              .sort(
                (a, b) => b.createdAt.substring(4) - b.createdAt.substring(4)
              ),
          })
        );
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Client"
          component={CustomBottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={CustomBottomTabAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adminActivity"
          component={AdminActivityScreen}
          options={{ headerShown: false }}
          initialParams={{ userid: null }}
        />
        <Stack.Screen
          name="UpdateUserAdmin"
          component={UpdateUserScreen}
          options={{ headerShown: false }}
          initialParams={{ userid: null }}
        />
        <Stack.Screen
          name="Subscription"
          component={MySubscription}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
