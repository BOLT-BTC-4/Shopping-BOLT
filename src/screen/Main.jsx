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

  const defaultShop = [
    { key: "1", value: "カネスエ江南店", corners: ["野菜", "果物", "お肉"] },
    { key: "2", value: "バロー安城店", corners: ["野菜", "卵", "お肉"] },
    { key: "3", value: "イオン熱田店", corners: ["お菓子", "お魚", "お肉"] },
    // {
    //   key: "4",
    //   value: "イオン安城店",
    //   corners: ["乳製品", "冷凍", "大豆類"],
    // },
    // {
    //   key: "5",
    //   value: "世界のメグリアカルフォルニア店",
    //   corners: ["パン", "ジャム", "お米"],
    // },
    // {
    //   key: "6",
    //   value: "ドン・キホーテ豊田店",
    //   corners: ["麺類", "惣菜", "調味料"],
    // },
    // {
    //   key: "7",
    //   value: "世界一のスーパメグリア",
    //   corners: ["飲料・酒", "日用品", "生活雑貨", "健康", "介護・ベビー"],
    // },
  ];

  // // ボタンを押した際の処理
  // const handleButtonPress = () => {
  //   navigation.navigate("売場登録");
  // };

  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);
  const [trashFlag, setTrashFlag] = useState(false);
  const [selected, setSelected] = useState("");
  // const { navigation } = props;

  // モーダルのuseState
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditShopVisible, setModalEditShopVisible] = useState(false);
  const [modalNewShopVisible, setModalNewShopVisible] = useState(false);

  // Shop関連のuseState
  const [corners, setCorners] = useState([]);
  const [shopName, setShopName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectShop, setSelectShop] = useState(defaultShop);

  // モーダルの表示制御の関数
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

  // 未実装
  // ローカルストレージに、shopNameとcornersをオブジェクトとして保存
  const handleButtonPress = () => {
    const shop = {
      key: uuid.v4(),
      value: shopName,
      corners: corners,
    };
    const newShops = [...selectShop]; // 現在のcornersのコピーを作成
    newShops.push(shop); // 新しい値を追加
    setSelectShop(newShops); // 変更された値をセット
    setCorners([]);
    setShopName("");
  };

  return (
    <View style={styles.container}>
      {/* <Text>お店選択</Text> */}
      <View style={styles.shopselect}>
        <View style={{ width: "90%", paddingRight: 10 }}>{/* ⭐️ここかえてます⭐️ */}
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={selectShop}
            save="value"
            searchPlaceholder="お店を入力"
            placeholder="お店を選択"
            maxHeight={200}
          />
        </View>
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
              <AddShop
                corners={corners}
                setCorners={setCorners}
                shopName={shopName}
                setShopName={setShopName}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
              <Button title="キャンセル" onPress={closeModalNewShop} />
              <Button
                title="保存"
                onPress={() => {
                  closeModalNewShop();
                  handleButtonPress();
                }}
              />
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
              <EditShop
                corners={corners}
                setCorners={setCorners}
                shopName={shopName}
                setShopName={setShopName}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
              <Button title="キャンセル" onPress={closeModalEditShop} />
              <Button title="保存" onPress={closeModalEditShop} />
            </View>
          </View>
        </Modal>
      </View>

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
      <MaterialIcons
        onPress={openModal}
        name="add-shopping-cart"
        size={35}
        color="black"
        style={styles.shoppingCart}
      />
      <Button
        title="購入したよ"
        onPress={() => {
          setTrashFlag = true;
        }}
        color="mediumseagreen"
      />
      <Modal visible={modalVisible} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <AddItem setItems={setItems} />
            <Button color="#fff" title="✖️" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
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
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: "red",
    padding: 10,
    alignItems: 'center',
  },
  shoppingCart: {
    textAlign: 'right',
    marginRight: 30,
    marginBottom: 30,
    marginTop: 10
    // backgroundColor: "red"

  }
});
