import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLOR_CONSTANTS } from "./src/constants/colorConstants";
import { FONT_CONSTANTS } from "./src/constants/fontConstants";
import { TEXT_CONSTANTS } from "./src/constants/textConstants";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createStackNavigator();

/**
 * Loading Screen Component
 */
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLOR_CONSTANTS.PRIMARY.MAIN} />
    </View>
  );
}

/**
 * Auth Navigation - Renders different navigation stacks based on auth state
 */
function AuthNavigation() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading screen while checking authentication state
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
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
        {isAuthenticated ? (
          // Authenticated Stack - User is logged in
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: TEXT_CONSTANTS.COMMON.HOME,
              headerLeft: null, // Remove back button
              gestureEnabled: false, // Disable swipe back gesture
            }}
          />
        ) : (
          // Unauthenticated Stack - User needs to login/signup
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: TEXT_CONSTANTS.COMMON.LOGIN,
                headerShown: false, // Hide header for cleaner look
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                title: TEXT_CONSTANTS.COMMON.SIGNUP,
                headerShown: false, // Hide header for cleaner look
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_CONSTANTS.BACKGROUND.PRIMARY,
  },
});
