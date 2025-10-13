import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR_CONSTANTS } from "../constants/colorConstants";
import { FONT_CONSTANTS } from "../constants/fontConstants";
import { TEXT_CONSTANTS } from "../constants/textConstants";
import { useAuth } from "../contexts/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = TEXT_CONSTANTS.ERRORS.EMAIL_REQUIRED;
    } else if (!validateEmail(email)) {
      newErrors.email = TEXT_CONSTANTS.ERRORS.INVALID_EMAIL;
    }

    if (!password.trim()) {
      newErrors.password = TEXT_CONSTANTS.ERRORS.PASSWORD_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigation.replace("Home");
    } else {
      Alert.alert(TEXT_CONSTANTS.ERRORS.LOGIN_FAILED, result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            {TEXT_CONSTANTS.MESSAGES.WELCOME_BACK}
          </Text>
          <Text style={styles.subtitle}>
            {TEXT_CONSTANTS.MESSAGES.SIGN_IN_TO_ACCOUNT}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{TEXT_CONSTANTS.COMMON.EMAIL}</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder={TEXT_CONSTANTS.PLACEHOLDERS.ENTER_EMAIL}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{TEXT_CONSTANTS.COMMON.PASSWORD}</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.password && styles.inputError,
                ]}
                placeholder={TEXT_CONSTANTS.PLACEHOLDERS.ENTER_PASSWORD}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>
                  {showPassword
                    ? TEXT_CONSTANTS.BUTTONS.TOGGLE_PASSWORD
                    : TEXT_CONSTANTS.BUTTONS.HIDE_PASSWORD}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
              {TEXT_CONSTANTS.COMMON.LOGIN}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              {TEXT_CONSTANTS.MESSAGES.DONT_HAVE_ACCOUNT}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLink}>
                {TEXT_CONSTANTS.BUTTONS.GO_TO_SIGNUP}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONSTANTS.BACKGROUND.PRIMARY,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: COLOR_CONSTANTS.BACKGROUND.CARD,
    borderRadius: 12,
    padding: 24,
    shadowColor: COLOR_CONSTANTS.SHADOW.CARD,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    ...FONT_CONSTANTS.STYLES.H2,
    color: COLOR_CONSTANTS.TEXT.PRIMARY,
    textAlign: FONT_CONSTANTS.ALIGN.CENTER,
    marginBottom: 8,
  },
  subtitle: {
    ...FONT_CONSTANTS.STYLES.BODY,
    color: COLOR_CONSTANTS.TEXT.SECONDARY,
    textAlign: FONT_CONSTANTS.ALIGN.CENTER,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    ...FONT_CONSTANTS.STYLES.LABEL,
    color: COLOR_CONSTANTS.TEXT.LABEL,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR_CONSTANTS.BORDER.DEFAULT,
    borderRadius: 8,
    padding: 12,
    ...FONT_CONSTANTS.STYLES.BODY,
    backgroundColor: COLOR_CONSTANTS.INPUT.BACKGROUND,
  },
  inputError: {
    borderColor: COLOR_CONSTANTS.BORDER.ERROR,
    backgroundColor: COLOR_CONSTANTS.INPUT.BACKGROUND_ERROR,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  eyeText: {
    fontSize: FONT_CONSTANTS.SIZE.XL,
  },
  errorText: {
    ...FONT_CONSTANTS.STYLES.ERROR,
    color: COLOR_CONSTANTS.TEXT.ERROR,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: COLOR_CONSTANTS.BUTTON.PRIMARY,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    ...FONT_CONSTANTS.STYLES.BUTTON_LARGE,
    color: COLOR_CONSTANTS.BUTTON.TEXT,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    ...FONT_CONSTANTS.STYLES.BODY,
    color: COLOR_CONSTANTS.TEXT.SECONDARY,
  },
  signupLink: {
    ...FONT_CONSTANTS.STYLES.LINK,
    color: COLOR_CONSTANTS.PRIMARY.MAIN,
  },
});

export default LoginScreen;
