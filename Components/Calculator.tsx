import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Button from "./Button";
import { Colors } from "../utils/Colors";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [isAllClear, setIsAllClear] = useState(false);

  const handleInput = (value: string) => {
    const lastChar = expression.slice(-1);
    if ("+-*/%".includes(lastChar) && "+-*/%".includes(value)) return;
    setExpression((prev) => prev + value);
    try {
      const evaluated = eval(expression + value);
      setDisplayValue(evaluated.toString());
    } catch {
      setDisplayValue("0");
    }
  };

  const handleClear = () => {
    if (isAllClear) {
      setExpression("");
      setDisplayValue("0");
      setHistory([]);
      setIsAllClear(false);
    } else {
      setExpression("");
      setDisplayValue("0");
      setIsAllClear(true);
      setTimeout(() => setIsAllClear(false), 1500);
    }
  };

  const handleDelete = () => {
    setExpression(expression.slice(0, -1));
    if (expression.length <= 1) setDisplayValue("0");
  };

  const handleEqual = () => {
    try {
      const result = eval(expression);
      setHistory((prev) => [`${expression} = ${result}`, ...prev]);
      setDisplayValue(result.toString());
      setExpression(result.toString());
    } catch {
      setDisplayValue("Error");
    }
  };

  // Adjust font size dynamically based on expression length
  const getDynamicFontSize = (text: string, baseSize: number) => {
    if (text.length <= 8) return baseSize;
    if (text.length <= 14) return baseSize - 6;
    if (text.length <= 20) return baseSize - 10;
    return baseSize - 14;
  };

  return (
    <View style={styles.container}>
      {/* History */}
      <ScrollView style={styles.history} contentContainerStyle={{ paddingBottom: 10 }}>
        {history.map((item, index) => (
          <Text key={index} style={styles.historyText}>
            {item}
          </Text>
        ))}
      </ScrollView>

      {/* Display */}
      <View style={styles.display}>
        <Text
          style={[
            styles.expressionText,
            { fontSize: getDynamicFontSize(expression, 36) },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {expression || "0"}
        </Text>

        <Text
          style={[
            styles.previewText,
            { fontSize: getDynamicFontSize(displayValue, 22) },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {displayValue}
        </Text>
      </View>

      <View style={styles.border}></View>

      {/* Keypad */}
      <View style={styles.keypad}>
        <Button title={isAllClear ? "AC" : "C"} type="top" onPress={handleClear} />
        <Button title="⌫" type="top" onPress={handleDelete} />
        <Button title="%" type="top" onPress={() => handleInput("%")} />
        <Button title="÷" type="right" onPress={() => handleInput("/")} />

        {["7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+"].map(
          (val, i) => (
            <Button
              key={i}
              title={val}
              type={isNaN(Number(val)) ? "right" : "number"}
              onPress={() => handleInput(val)}
            />
          )
        )}

        <Button title="0" type="number" onPress={() => handleInput("0")} />
        <Button title="00" type="number" onPress={() => handleInput("00")} />
        <Button title="." type="number" onPress={() => handleInput(".")} />
        <Button title="=" type="right" onPress={handleEqual} />
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  history: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  historyText: {
    color: "#888",
    fontSize: 18,
    marginVertical: 2,
  },
  display: {
    minHeight: 80, // fixed height so keypad never moves
    paddingHorizontal: 20,
    backgroundColor: Colors.bg,
    paddingBottom: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  expressionText: {
    fontWeight: "400",
    color: Colors.light,
  },
  previewText: {
    fontWeight: "300",
    color: "#aaa",
  },
  border: {
    borderBottomColor: Colors.btnRight,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  keypad: {
    flex: 2,
    backgroundColor: Colors.bg,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    padding: 10,
    paddingTop: 30,
  },
});
