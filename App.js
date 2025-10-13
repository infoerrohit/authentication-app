import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { COLOR_CONSTANTS } from "./src/constants/colorConstants";
import { FONT_CONSTANTS } from "./src/constants/fontConstants";
import { TEXT_CONSTANTS } from "./src/constants/textConstants";
import { AuthProvider } from "./src/contexts/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLOR_CONSTANTS.PRIMARY.MAIN,
            },
            headerTintColor: COLOR_CONSTANTS.TEXT.WHITE,
            headerTitleStyle: {
              ...FONT_CONSTANTS.STYLES.BUTTON_LARGE,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: TEXT_CONSTANTS.COMMON.LOGIN }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: TEXT_CONSTANTS.COMMON.SIGNUP }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: TEXT_CONSTANTS.COMMON.HOME }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
