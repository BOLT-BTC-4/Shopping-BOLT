import React, { useEffect, useState } from "react";

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
        <Text style={styles.item}>{item}</Text>
        <Text style={styles.text}>{quantity}</Text>
        <Text style={styles.text}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    top: 5,
    left: 4,
    // right: 5,
    height: 50,
    width: "98%",
    borderColor: "#b6c471",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",

    // position: "absolute",
    // top: 0,
    // right: 0,

    // left: 0,
    // width: 200,
    // marginTop: 10,
    // marginleft: 20,
  },

  moziBox: {
    flex: 1,
    backgroundColor: "#fff0d4",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  item: {
    flex: 1,
    left: 50,
  },

  text: {
    fontSize: 16,
  },

  subText: {
    fontSize: 12,
    color: "red",
  },
});
