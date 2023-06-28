import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Calendar } from "react-native-calendars";

export const MenuList = () => {
  const testData = [];
  return (
    // <View>
    //   <Text>Menu</Text>
    //   <Calendar />
    // </View>
    // <NativeBaseProvider>
    <SafeAreaView>
      <Calendar
        dayComponent={({ date, state }) => {
          return (
            <View>
              <Text style={{ color: "red" }}>{date.day}</Text>
              <Text>test</Text>
              <Text>test2</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
    // </NativeBaseProvider>
  );
};
