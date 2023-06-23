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
    <View style={check ? [styles.box, styles.check] : styles.box}>

      <View style={styles.salesBox}>
        <Text style={styles.text}>{sales}</Text>
      </View>

      <View style={styles.moziBox}>
        <Text
          style={styles.text}
          onPress={() => handleCheck(localId)}
        >
          {item}
        </Text>
        <Text style={styles.text}>{quantity}</Text>
      </View>

      <View style={styles.iconBox}>
        <Text style={styles.text}>{unit}</Text>
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
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },

  check: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textDecorationLine: "line-through"
  },

  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  salesBox: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  text: {
    fontSize: 16,
  },


  subText: {
    fontSize: 12,
    color: "red",
  },
});
