import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ItemList } from "../components/ItemList";

export const Main = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    setItems([
      {
        sales: "🥦 野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "🥩 肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
      {
        sales: "🥦 野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "🥩 肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
      {
        sales: "🥦 野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "🥩 肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
    ]);
  };
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <View style={styles.container}>
      <SelectList
        style={styles.selectList} //cssが効かない
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      />
      <FlatList //実体ない為CSS不要
        data={items}
        renderItem={({ item }) => (
          <ItemList
            sales={item.sales}
            item={item.itemName}
            quantity={item.quantity}
            unit={item.unit}
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
    top: 20,
    backgroundColor: "#b6c471",
    // justifyContent: "center",
    // alignContent: "center",
  },
  selectList: {
    flex: 1,
    // backgroundColor: "powderblue",
    // width: 90,
    // haight: 50,
    // marginTop: 20,
    // marginleft: 100,
    // justifyContent: "center",
    // alignContent: "center",
  },
});
