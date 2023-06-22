import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { ItemList } from "../components/ItemList";
import { AddItem } from "../components/AddItem";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
  Button,
  Modal,
} from "react-native";

export const Main = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);
  const [trashFlag, setTrashFlag] = useState(false);
  const [selected, setSelected] = useState("");
  // const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getItems = () => {
    setItems([
      {
        sales: "野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
    ]);
  };

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const masterItemTable = [
    {
      sales: "野菜",
      itemName: "玉ねぎ",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "果物",
      itemName: "リンゴ",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "お肉",
      itemName: "鶏肉",
      quantity: 200,
      unit: "g",
    },
    {
      sales: "卵",
      itemName: "卵",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "お魚",
      itemName: "サンマ",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "乳製品",
      itemName: "ヨーグルト",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "冷凍",
      itemName: "アイス",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "大豆類",
      itemName: "納豆",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "お菓子",
      itemName: "ポテチ",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "パン",
      itemName: "食パン",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "ジャム",
      itemName: "いちごジャム",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "お米",
      itemName: "米",
      quantity: 10,
      unit: "kg",
    },
    {
      sales: "麺類",
      itemName: "パスタ",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "惣菜",
      itemName: "コロッケ",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "調味料",
      itemName: "胡椒",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "飲料・酒",
      itemName: "ビール",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "日用品",
      itemName: "ごみ袋",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "生活雑貨",
      itemName: "フライ返し",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "健康",
      itemName: "サプリメント",
      quantity: 1,
      unit: "個",
    },
    {
      sales: "介護・ベビー",
      itemName: "おむつ",
      quantity: 1,
      unit: "個",
    },
  ];

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      />
      <FlatList
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
      <Button
        title="購入したよ"
        onPress={() => {
          setTrashFlag = true;
        }}
      />
      <MaterialIcons
        onPress={openModal}
        name="add-shopping-cart"
        size={24}
        color="black"
      />
      <Modal visible={modalVisible} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Button title="Close Modal" onPress={closeModal} />
            <AddItem setItems={setItems} masterItemTable={masterItemTable} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
