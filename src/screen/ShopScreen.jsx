import React, { useEffect, useState, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { ShareShopDataContext } from "./ShareShopDataContext";
import { ShopList } from "../components/ShopComponents/ShopList";

import { useForm, Controller } from "react-hook-form";

export const ShopScreen = () => {
  const [newShop, setNewShop] = useState(true);
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  console.log("shopScreen:", shopData);
  useEffect(() => {}, [shopData]);
  return (
    <View>
      <FlatList
        data={shopData}
        renderItem={({ item }) => (
          <ShopList
            value={item.value}
            // handleCheck={handleCheck}
            // handleRemoveItem={handleRemoveItem}
            // items={items}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <MaterialIcons
        name="add-circle-outline"
        size={24}
        color="black"
        onPress={() => {
          setTargetString(cornerName);
          setModalAddCornerVisible(true);
          navigation.navigate("お店登録");
          setNewShop(true);
        }}
      />
      <AddShop
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        selectShop={selectShop}
        setSelectShop={setSelectShop}
        newShop={newShop}
      />
    </View>
  );
};
