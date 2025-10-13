import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TEXT_CONSTANTS } from "../constants/textConstants";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      if (
        email === TEXT_CONSTANTS.TEST.EMAIL &&
        password === TEXT_CONSTANTS.TEST.PASSWORD
      ) {
        const userData = {
          id: "1",
          name: TEXT_CONSTANTS.TEST.USER_NAME,
          email: email,
        };
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return {
          success: false,
          error: TEXT_CONSTANTS.ERRORS.INVALID_CREDENTIALS,
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: TEXT_CONSTANTS.ERRORS.LOGIN_ERROR };
    }
  };

  const signup = async (name, email, password) => {
    try {
      if (password.length < 6) {
        return {
          success: false,
          error: TEXT_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT,
        };
      }

      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
      };
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: TEXT_CONSTANTS.ERRORS.SIGNUP_ERROR };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
