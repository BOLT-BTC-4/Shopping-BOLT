import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createShopAPI, fetchShopAPI } from "../boltAPI";
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
import { deleteShopAPI } from "../boltAPI";

export const ShopScreen = ({ navigation }) => {
  console.log("===== comp_ShopScreen =====");
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  const { shopDataDrop, setShopDataDrop } = useContext(ShareShopDataContext);
  // const { selectedValue, setSelectedValue } = useContext(ShareShopDataContext);

  const handleRemoveItem = async (id) => {

    await deleteShopAPI(id);
    const initShopData = await fetchShopAPI();
    setShopData(initShopData);

    //ドロップダウンで利用できるようにオブジェクトキー変更
    const getArrayDropDownList = initShopData.map((item) => {
      return { key: item.id, value: item.shop, corner: item.corner };
    });
    setShopDataDrop(getArrayDropDownList);


    // ↑バックと連携完了したので↓コメントアウト
    // const newShopData = shopData.filter((item) => item.id !== key);
    // setShopData(newShopData);
  };

  useEffect(() => {
    // お店の一覧を取得
    const getAllShop = async () => {
      const initShopData = await fetchShopAPI();
      //ドロップダウンで利用できるようにオブジェクトキー変更
      const getArrayDropDownList = initShopData.map((item) => {
        return { key: item.id, value: item.shop, corner: item.corner };
      });
      setShopData(initShopData);
      setShopDataDrop(getArrayDropDownList);
    };
    getAllShop()
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          navigation.navigate("新規登録");
        }}
      >
        <MaterialIcons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={shopData}
        renderItem={({ item }) => (
          <ShopList
            shop={item.shop}
            navigation={navigation}
            // handleCheck={handleCheck}
            handleRemoveItem={handleRemoveItem}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  shopSelect: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
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
