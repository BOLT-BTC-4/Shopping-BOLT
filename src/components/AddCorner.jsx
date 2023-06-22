import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const AddCorner = (props) => {
  console.log("=====AddCorner側の処理です=====");
  const { filteredCorners, setCorners, selectedValue, setSelectedValue } =
    props;
  console.log(filteredCorners);
  console.log(setCorners);
  return (
    <View>
      <Text>AddCornerだよ！</Text>
      <Picker
        style={{ width: 200 }}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {filteredCorners.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};
