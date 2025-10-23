import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { Colors } from "../utils/Colors";
// ...existing code...

type Props = {
  title: string;
  type: "top" | "right" | "number";
  onPress: (event?: GestureResponderEvent) => void;
};

const Button: React.FC<Props> = ({ title, type, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            type == "top"
              ? Colors.btnDark
              : type == "right"
              ? Colors.btnRight
              : Colors.btnLight,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 24,
          color: type == "number" ? Colors.black : Colors.white,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

// ...existing code...
const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.btnDark,
  },
});