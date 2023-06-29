import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";

export const ShopList = ({
  value,
  handleCheck,
  handleRemoveItem,
  navigation,
}) => {
  //   const Stack = createNativeStackNavigator();
  const { newShopButton, setNewShopButton } = useContext(ShareShopDataContext);
  useEffect(() => {}, [newShopButton]);
  return (
    <View style={styles.box}>
      <View style={styles.moziBox}>
        <Text style={styles.text}>{value}</Text>
      </View>
      <View style={styles.iconBox}>
        <Feather
          name="edit"
          size={24}
          color="black"
          onPress={() => {
            console.log("お店の修正ボタン押されたよ");
            setNewShopButton(false);
            console.log("ShopList_newShopButton:", newShopButton);
            navigation.navigate("お店編集", { newShopButton });
          }}
        />
        <Feather
          name="trash-2"
          size={24}
          color="black"
          onPress={() => handleRemoveItem(item.localId)}
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
    paddingRight: 10,
  },

  check: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textDecorationLine: "line-through",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContents: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
