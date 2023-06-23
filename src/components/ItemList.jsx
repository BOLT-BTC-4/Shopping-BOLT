import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";

export const ItemList = ({
  localId,
  sales,
  item,
  quantity,
  unit,
  check,
  handleCheck,
  handleRemoveItem,
}) => {
  console.log("key:", localId);
  return (
    <View style={styles.box}>
      <View style={check ? styles.moziBoxCheck : styles.moziBox}>
        <Text style={check ? styles.textCheck : styles.text}>{sales}</Text>
        <Text
          style={check ? styles.textCheck : styles.text}
          onPress={() => handleCheck(localId)}
        >
          {item}
        </Text>
        <Text style={check ? styles.textCheck : styles.text}>{quantity}</Text>
        <Text style={check ? styles.textCheck : styles.text}>{unit}</Text>
        <Feather name="edit" size={24} color="black" />
        <Feather
          name="trash-2"
          size={24}
          color="black"
          onPress={() => handleRemoveItem(localId)}
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
  moziBoxCheck: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  text: {
    fontSize: 16,
  },
  textCheck: {
    fontSize: 16,
    textDecorationLine: "line-through",
  },

  subText: {
    fontSize: 12,
    color: "red",
  },
});
