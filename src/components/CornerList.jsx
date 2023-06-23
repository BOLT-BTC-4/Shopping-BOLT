import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-web";
import { AddShop } from "../screen/AddShop";

export const CornerList = ({
  cornerName,
  handleDelete,
  handleAddAfter,
  handleTargetString,
}) => {
  return (
    <View style={styles.box}>
      <View style={styles.moziBox}>
        <Text style={styles.text}>{cornerName}</Text>
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color="black"
          onPress={() => {
            handleTargetString(cornerName);
            handleAddAfter();
          }}
        />
        <Feather
          name="trash-2"
          size={24}
          color="black"
          onPress={() => handleDelete(cornerName)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: "100%",
    borderColor: "lightblue",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  moziBox: {
    flex: 1,
    backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  text: {
    fontSize: 16,
  },

  subText: {
    fontSize: 12,
    color: "red",
  },
});
