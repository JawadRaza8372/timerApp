import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomBottomTab from "./CustomBottomTab";
import AuthScreen from "../Views/AuthScreen";
import CustomBottomTabAdmin from "./CustomBottomTabAdmin";
import AdminActivityScreen from "../Views/AdminActivityScreen";
import UpdateUserScreen from "../Views/UpdateUserScreen";
const Stack = createStackNavigator();
export default function MyStackNavig() {
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
        />
        <Stack.Screen
          name="UpdateUserAdmin"
          component={UpdateUserScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
