import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ShareShopDataContext } from "./ShareShopDataContext";
import { ShopList } from "../components/ShopComponents/ShopList";

import { useForm, Controller } from "react-hook-form";

export const ShopScreen = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const { newShopButton, setNewShopButton } = useContext(ShareShopDataContext);
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  // const { selectedValue, setSelectedValue } = useContext(ShareShopDataContext);

  useEffect(() => {}, [shopData, newShopButton]);
  return (
    <View>
      <FlatList
        data={shopData}
        renderItem={({ item }) => (
          <ShopList
            value={item.value}
            navigation={navigation}
            // handleCheck={handleCheck}
            // handleRemoveItem={handleRemoveItem}
            // items={items}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          console.log("お店の新規登録ボタン押されたよ");
          navigation.navigate("新規登録", { newShopButton });
        }}
      >
        <MaterialIcons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    // justifyContent: "center",
    // alignContent: "center",
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
  shopselect: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  // shoppingCart: {
  //   textAlign: "right",
  //   marginRight: 30,
  //   marginBottom: 30,
  //   marginTop: 10,
  // },
  underBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 20,
    marginTop: 10,
  },
});
