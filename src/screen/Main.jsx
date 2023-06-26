import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { ItemList } from "../components/ItemList";
import { AddItem } from "../components/AddItem";
import { EditShop } from "./EditShop";
import { AddShop } from "./AddShop";
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
import { table } from "../../table";

export const Main = () => {
  // 追加
  const navigation = useNavigation();

  const defaultShop = [
    {
      key: "1",
      value: "カネスエ江南店",
      corners: ["野菜", "果物", "お肉", "卵", "お菓子", "お魚"],
    },
    {
      key: "2",
      value: "バロー安城店",
      corners: ["お魚", "お菓子", "卵", "お肉", "野菜", "果物"],
    },
    {
      key: "3",
      value: "イオン熱田店",
      corners: ["お肉", "お魚", "野菜", "果物", "お菓子", "卵"],
    },
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
  //アイテムリスト
  const [items, setItems] = useState([]);
  //商品追加用flag
  const [addFlag, setAddFlag] = useState(false);
  //初回のみデフォルトのitemsデータを取得
  useEffect(() => {
    getItems();
  }, []);
  const getItems = () => {
    setItems(table.defaultItems);
  };

  // const [trashFlag, setTrashFlag] = useState(false);
  // const [selected, setSelected] = useState("");  →selectedValueに変更

  // モーダルのuseState
  const [modalAddItemVisible, setModalAddItemVisible] = useState(false);
  const [modalEditShopVisible, setModalEditShopVisible] = useState(false);
  const [modalAddShopVisible, setModalAddShopVisible] = useState(false);

  // Shop関連のuseState
  // const [corners, setCorners] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectShop, setSelectShop] = useState(defaultShop);

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

  const handleAllRemoveItem = () => {
    const newItems = items.filter((item) => item.check === false);
    setItems(newItems);
  };

  //順番付与
  const directionAdd = () => {
    const selectedShopObj = selectShop.find(
      (shop) => shop.value === selectedValue
    );
    // console.log(selectedShopObj);
    //店舗が選択されていなければ処理を抜ける
    if (selectedShopObj === undefined) {
      setAddFlag(false);
      return;
    }
    const newItems = items.map((item) => {
      selectedShopObj.corners.forEach((cornar, index) => {
        if (item.sales === cornar) {
          item.directions = index;
        }
      });
      return item;
    });
    //ソート
    newItems.sort(function (a, b) {
      if (a.directions > b.directions) return 1;
      if (b.directions > a.directions) return -1;
      return 0;
    });
    setItems(newItems);
    setAddFlag(false);
  };

  if (addFlag) {
    directionAdd();
  }

  return (
    <View style={styles.container}>
      {/* <Text>お店選択</Text> */}
      <View style={styles.shopselect}>
        <View style={{ width: "90%", paddingRight: 10 }}>
          {/* ⭐️ここかえてます⭐️ */}
          <SelectList
            setSelected={(val) => setSelectedValue(val)}
            data={selectShop}
            save="value"
            searchPlaceholder="お店を入力"
            placeholder="お店を選択"
            maxHeight={200}
            onSelect={() => directionAdd()}
          />
        </View>
        {/* 新規店舗登録アイコン */}
        <MaterialIcons
          onPress={() => {
            setModalAddShopVisible(true);
          }}
          name="add-business"
          size={36}
          color="black"
        />

        {/* 新規店舗登録モーダル */}
        <Modal
          visible={modalAddShopVisible}
          animationType="none"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <AddShop
                // corners={corners}
                // setCorners={setCorners}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                selectShop={selectShop}
                setSelectShop={setSelectShop}
                setModalAddShopVisible={setModalAddShopVisible}
              />
            </View>
          </View>
        </Modal>
        {/* 店情報修正アイコン */}
        <FontAwesome
          onPress={() => {
            setModalEditShopVisible(true);
          }}
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
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                selectShop={selectShop}
                setSelectShop={setSelectShop}
                setModalEditShopVisible={setModalEditShopVisible}

                // corners={corners}
                // setCorners={setCorners}
              />
            </View>
          </View>
        </Modal>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemList
            item={item}
            handleCheck={handleCheck}
            handleRemoveItem={handleRemoveItem}
            items={items}
            setItems={setItems}
            setAddFlag={setAddFlag}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.underBar}>
        <Button
          title="購入したよ"
          onPress={handleAllRemoveItem}
          color="mediumseagreen"
        />
        <MaterialIcons
          onPress={() => setModalAddItemVisible(true)}
          name="add-shopping-cart"
          size={35}
          color="black"
        />
      </View>
      {/* 商品追加モーダル */}
      <Modal
        visible={modalAddItemVisible}
        animationType="none"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <AddItem
              setItems={setItems}
              setAddFlag={setAddFlag}
              setModalAddItemVisible={setModalAddItemVisible}
            />
          </View>
        </View>
      </Modal>
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
