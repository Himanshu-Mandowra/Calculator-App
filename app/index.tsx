import { View } from "react-native";
import Calculator from "../Components/Calculator";
import { Stack } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "H.M Calculator" }} />
      <Calculator />
    </>
  );
}
