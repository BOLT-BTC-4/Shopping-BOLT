import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { ItemList } from "../components/ItemList";
import { AddItem } from "../components/AddItem";
import { EditShop } from "./EditShop";
import { AddShop } from "./AddShop";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import uuid from "react-native-uuid";
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

// 追加
import { useNavigation } from "@react-navigation/native";

export const Main = () => {
  // 追加
  const navigation = useNavigation();

  // ボタンを押した際の処理
  const handleButtonPress = () => {
    navigation.navigate("売場登録");
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);
  const [trashFlag, setTrashFlag] = useState(false);
  const [selected, setSelected] = useState("");
  // const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditShopVisible, setModalEditShopVisible] = useState(false);
  const [modalNewShopVisible, setModalNewShopVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModalEditShop = () => {
    setModalEditShopVisible(true);
  };

  const closeModalEditShop = () => {
    setModalEditShopVisible(false);
  };

  const openModalNewShop = () => {
    setModalNewShopVisible(true);
  };

  const closeModalNewShop = () => {
    setModalNewShopVisible(false);
  };

  const getItems = () => {
    setItems([
      {
        localId: uuid.v4(),
        sales: "野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        localId: uuid.v4(),
        sales: "肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
    ]);
  };

  const selectShop = [
    { key: "1", value: "カネスエ江南店" },
    { key: "2", value: "バロー安城店" },
    { key: "3", value: "イオン熱田店" },
    { key: "4", value: "イオン安城店" },
    { key: "5", value: "世界のメグリアカルフォルニア店" },
    { key: "6", value: "ドン・キホーテ豊田店" },
    { key: "7", value: "世界一のスーパメグリア" },
  ];

  const handleCheck = (localId) => {
    const newItems = [...items];
    const item = newItems.find((item) => item.localId === localId);
    item.check = !item.check;
    setItems(newItems);
  };

  const handleRemoveItem = (localId) => {
    const newItems = items.filter((item) => item.localId !== localId);
    setItems(newItems);
  };

  console.log(items);
  return (
    <View style={styles.container}>
      <Text>お店選択</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={selectShop}
        save="value"
        searchPlaceholder="お店を入力"
        placeholder="お店を選択"
        maxHeight={200}
      />
      {/* 新規店舗登録アイコン */}
      <MaterialIcons
        onPress={openModalNewShop}
        name="add-business"
        size={36}
        color="black"
      />

      {/* 新規店舗登録モーダル */}
      <Modal
        visible={modalNewShopVisible}
        animationType="none"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <EditShop />
            <Button title="キャンセル" onPress={closeModalNewShop} />
            <Button title="保存" onPress={closeModalNewShop} />
          </View>
        </View>
      </Modal>

      {/* 店情報修正アイコン */}
      <FontAwesome
        onPress={openModalEditShop}
        name="pencil-square-o"
        size={36}
        color="black"
      />
      {/* 店情報修正モーダル */}
      <Modal
        visible={modalEditShopVisible}
        animationType="none"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <EditShop />
            <Button title="キャンセル" onPress={closeModalEditShop} />
            <Button title="保存" onPress={closeModalEditShop} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemList
            localId={item.localId}
            sales={item.sales}
            item={item.itemName}
            quantity={item.quantity}
            unit={item.unit}
            check={item.check}
            handleCheck={handleCheck}
            handleRemoveItem={handleRemoveItem}
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
            <AddItem setItems={setItems} />
            <Button title="Close Modal" onPress={closeModal} />
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
