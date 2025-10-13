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
import { useFormValidation } from "../hooks/useFormValidation";

const SignupScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  // Form validation rules
  const validationRules = {
    name: {
      required: true,
      requiredMessage: TEXT_CONSTANTS.ERRORS.NAME_REQUIRED,
    },
    email: {
      required: true,
      email: true,
      requiredMessage: TEXT_CONSTANTS.ERRORS.EMAIL_REQUIRED,
      emailMessage: TEXT_CONSTANTS.ERRORS.INVALID_EMAIL,
    },
    password: {
      required: true,
      password: true,
      requiredMessage: TEXT_CONSTANTS.ERRORS.PASSWORD_REQUIRED,
      passwordMessage: TEXT_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT,
    },
  };

  const { values, errors, setValue, validateForm, handleBlur, isFormValid } =
    useFormValidation({ name: "", email: "", password: "" }, validationRules);

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    const result = await signup(values.name, values.email, values.password);
    if (!result.success) {
      Alert.alert(TEXT_CONSTANTS.ERRORS.SIGNUP_FAILED, result.error);
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
            {TEXT_CONSTANTS.MESSAGES.CREATE_ACCOUNT}
          </Text>
          <Text style={styles.subtitle}>
            {TEXT_CONSTANTS.MESSAGES.SIGN_UP_TO_GET_STARTED}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{TEXT_CONSTANTS.LABELS.FULL_NAME}</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder={TEXT_CONSTANTS.PLACEHOLDERS.ENTER_NAME}
              placeholderTextColor={COLOR_CONSTANTS.TEXT.SECONDARY}
              value={values.name}
              onChangeText={(text) => setValue("name", text)}
              onBlur={() => handleBlur("name")}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{TEXT_CONSTANTS.COMMON.EMAIL}</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder={TEXT_CONSTANTS.PLACEHOLDERS.ENTER_EMAIL}
              placeholderTextColor={COLOR_CONSTANTS.TEXT.SECONDARY}
              value={values.email}
              onChangeText={(text) => setValue("email", text)}
              onBlur={() => handleBlur("email")}
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
                placeholderTextColor={COLOR_CONSTANTS.TEXT.SECONDARY}
                value={values.password}
                onChangeText={(text) => setValue("password", text)}
                onBlur={() => handleBlur("password")}
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

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>
              {TEXT_CONSTANTS.COMMON.SIGNUP}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              {TEXT_CONSTANTS.MESSAGES.ALREADY_HAVE_ACCOUNT}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>
                {TEXT_CONSTANTS.BUTTONS.GO_TO_LOGIN}
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
    color: COLOR_CONSTANTS.TEXT.PRIMARY,
    placeholderTextColor: COLOR_CONSTANTS.TEXT.SECONDARY,
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
  signupButton: {
    backgroundColor: COLOR_CONSTANTS.BUTTON.PRIMARY,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  signupButtonText: {
    ...FONT_CONSTANTS.STYLES.BUTTON_LARGE,
    color: COLOR_CONSTANTS.BUTTON.TEXT,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    ...FONT_CONSTANTS.STYLES.BODY,
    color: COLOR_CONSTANTS.TEXT.SECONDARY,
  },
  loginLink: {
    ...FONT_CONSTANTS.STYLES.LINK,
    color: COLOR_CONSTANTS.PRIMARY.MAIN,
  },
});

export default SignupScreen;
