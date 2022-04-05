import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomBottomTab from "./CustomBottomTab";
import AuthScreen from "../Views/AuthScreen";
import CustomBottomTabAdmin from "./CustomBottomTabAdmin";
import AdminActivityScreen from "../Views/AdminActivityScreen";
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
          component={CustomBottomTabAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adminActivity"
          component={AdminActivityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
