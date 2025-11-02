import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics"; // ← Import Expo Haptics
import { Colors } from "../utils/Colors";

type Props = {
  title: string;
  type: "top" | "right" | "number";
  onPress: (event?: GestureResponderEvent) => void;
};

const Button: React.FC<Props> = ({ title, type, onPress }) => {
  const handlePress = async (event?: GestureResponderEvent) => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // ✅ smooth vibration
    }
    onPress(event);
  };

  const bgColor =
    type === "top"
      ? Colors.btnDark
      : type === "right"
      ? Colors.btnRight
      : Colors.transparent;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: "500",
  },
});
