import React, { useCallback } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR_CONSTANTS } from "../constants/colorConstants";
import { FONT_CONSTANTS } from "../constants/fontConstants";
import { TEXT_CONSTANTS } from "../constants/textConstants";
import { useAuth } from "../contexts/AuthContext";

const HomeScreen = React.memo(() => {
  const { user, logout } = useAuth();

  const handleLogout = useCallback(() => {
    Alert.alert(
      TEXT_CONSTANTS.COMMON.LOGOUT,
      TEXT_CONSTANTS.MESSAGES.LOGOUT_CONFIRMATION,
      [
        {
          text: TEXT_CONSTANTS.COMMON.CANCEL,
          style: "cancel",
        },
        {
          text: TEXT_CONSTANTS.COMMON.LOGOUT,
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  }, [logout]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            {TEXT_CONSTANTS.COMMON.WELCOME}
          </Text>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            {TEXT_CONSTANTS.LABELS.ACCOUNT_INFO}
          </Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{TEXT_CONSTANTS.COMMON.NAME}:</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{TEXT_CONSTANTS.COMMON.EMAIL}:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {TEXT_CONSTANTS.LABELS.USER_ID}:
            </Text>
            <Text style={styles.infoValue}>{user?.id}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>
            {TEXT_CONSTANTS.COMMON.LOGOUT}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

HomeScreen.displayName = "HomeScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONSTANTS.BACKGROUND.PRIMARY,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    ...FONT_CONSTANTS.STYLES.H1,
    color: COLOR_CONSTANTS.TEXT.PRIMARY,
    marginBottom: 8,
  },
  nameText: {
    ...FONT_CONSTANTS.STYLES.H3,
    color: COLOR_CONSTANTS.PRIMARY.MAIN,
    marginBottom: 4,
  },
  emailText: {
    ...FONT_CONSTANTS.STYLES.BODY,
    color: COLOR_CONSTANTS.TEXT.SECONDARY,
  },
  infoContainer: {
    backgroundColor: COLOR_CONSTANTS.BACKGROUND.CARD,
    borderRadius: 12,
    padding: 24,
    marginBottom: 40,
    shadowColor: COLOR_CONSTANTS.SHADOW.CARD,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    ...FONT_CONSTANTS.STYLES.H4,
    color: COLOR_CONSTANTS.TEXT.PRIMARY,
    marginBottom: 16,
    textAlign: FONT_CONSTANTS.ALIGN.CENTER,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_CONSTANTS.BORDER.LIGHT,
  },
  infoLabel: {
    ...FONT_CONSTANTS.STYLES.LABEL,
    color: COLOR_CONSTANTS.TEXT.LABEL,
    flex: 1,
  },
  infoValue: {
    ...FONT_CONSTANTS.STYLES.BODY,
    color: COLOR_CONSTANTS.TEXT.SECONDARY,
    flex: 2,
    textAlign: FONT_CONSTANTS.ALIGN.RIGHT,
  },
  logoutButton: {
    backgroundColor: COLOR_CONSTANTS.BUTTON.DANGER,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    ...FONT_CONSTANTS.STYLES.BUTTON_LARGE,
    color: COLOR_CONSTANTS.BUTTON.TEXT,
  },
});

export default HomeScreen;
