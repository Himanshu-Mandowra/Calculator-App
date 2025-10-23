import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Button from "./Button";
import { Colors } from "../utils/Colors";

const Calculator = () => {
  const [firstValue, setFirstValue] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");

  const handleNumberInput = (num: string) => {
    if (displayValue == "0") {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (operator: string) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue("0");
  };

  const handleCalculation = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    let result = 0; // Hum result ko yahaan store karenge

    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    } else if (operator === "*") {
      result = num1 * num2;
    } else if (operator === "/") {
      result = num1 / num2;
    } else if (operator === "%") {
      result = num1 % num2;
    }

    // --- YEH HAI NAYA LOGIC ---

    // 1. Result ko displayValue mein set karo
    setDisplayValue(result.toString());

    // 2. History ko firstValue mein set karo (taaki woh upar dikhe)
    setFirstValue(`${firstValue} ${operator} ${num2} =`);

    // 3. Operator ko clear kar do taaki history ke aage operator na dikhe
    setOperator("");

    // firstValue ko clear nahi karna hai, kyunki ab woh history hai! // setFirstValue(""); // <-- Iss line ko humne hata diya hai
  };
  const handleClear = () => {
    setDisplayValue("0");
    setOperator("");
    setFirstValue("");
  };

  const handleDelete = () => {
    if (displayValue.length == 1) {
      setDisplayValue("0");
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={{ fontSize: 30, fontWeight: "300" }}>
          {firstValue + operator}
        </Text>
        <Text style={{ fontSize: 70, fontWeight: "300" }}>{displayValue}</Text>
      </View>
      <View style={styles.keypad}>
        <Button title="C" type="top" onPress={handleClear} />
        <Button title="⌫" type="top" onPress={handleDelete} />
        <Button title="%" type="top" onPress={() => handleOperatorInput("%")} />
        <Button
          title="÷"
          type="right"
          onPress={() => handleOperatorInput("/")}
        />
        <Button
          title="7"
          type="number"
          onPress={() => handleNumberInput("7")}
        />
        <Button
          title="8"
          type="number"
          onPress={() => handleNumberInput("8")}
        />
        <Button
          title="9"
          type="number"
          onPress={() => handleNumberInput("9")}
        />
        <Button
          title="x"
          type="right"
          onPress={() => handleOperatorInput("*")}
        />
        <Button
          title="6"
          type="number"
          onPress={() => handleNumberInput("6")}
        />
        <Button
          title="5"
          type="number"
          onPress={() => handleNumberInput("5")}
        />
        <Button
          title="4"
          type="number"
          onPress={() => handleNumberInput("4")}
        />
        <Button
          title="-"
          type="right"
          onPress={() => handleOperatorInput("-")}
        />
        <Button
          title="1"
          type="number"
          onPress={() => handleNumberInput("1")}
        />
        <Button
          title="2"
          type="number"
          onPress={() => handleNumberInput("2")}
        />
        <Button
          title="3"
          type="number"
          onPress={() => handleNumberInput("3")}
        />
        <Button
          title="+"
          type="right"
          onPress={() => handleOperatorInput("+")}
        />
        <Button
          title="0"
          type="number"
          onPress={() => handleNumberInput("0")}
        />
        <Button
          title="00"
          type="number"
          onPress={() => handleNumberInput("00")}
        />
        <Button
          title="."
          type="number"
          onPress={() => handleNumberInput(".")}
        />
        <Button title="=" type="right" onPress={handleCalculation} />
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  keypad: {
    flex: 2,
    borderColor: Colors.btnRight,
    borderTopWidth: 1,
    backgroundColor: Colors.light,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    padding: 10,
    paddingTop: 30,
  },
});
