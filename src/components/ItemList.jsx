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

export const ItemList = ({ sales, item, quantity, unit }) => {
  return (
    <View style={styles.box}>
      <View style={styles.moziBox}>
        <Text style={styles.text}>{sales}</Text>
        <Text style={styles.text}>{item}</Text>
        <Text style={styles.text}>{quantity}</Text>
        <Text style={styles.text}>{unit}</Text>
        <Feather name="edit" size={24} color="black" />
        <Feather name="trash-2" size={24} color="black" />
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
