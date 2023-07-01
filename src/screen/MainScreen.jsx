import React, { useEffect, useState, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { ItemList } from "../components/MainComponents/ItemList";
import { AddItem } from "../components/MainComponents/AddItem";
import { EditShop } from "../components/ShopComponents/EditShop";
import { AddShop } from "../components/ShopComponents/AddShop";
import { ShareShopDataContext } from "./ShareShopDataContext";
import { table } from "../../table";
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

export const MainScreen = () => {
  console.log("===== comp_MainScreen =====");
  //アイテムリスト
  const { items, setItems } = useContext(ShareShopDataContext);

  //商品追加用flag
  const { addFlag, setAddFlag } = useContext(ShareShopDataContext);

  // Shop関連のuseState
  // 買物/お店タブで利用するため2つともContext化
  const { selectedValue, setSelectedValue } = useContext(ShareShopDataContext);

  // shopタブでも利用するため下記のshopDataに名称変更
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  console.log("shopData:", shopData);

  //初回のみデフォルトのitemsデータを取得
  useEffect(() => {
    getItems();
    // handleButtonClick();
  }, []);
  const getItems = () => {
    setItems(table.defaultItems);
  };

  // モーダルのuseState
  const [modalAddItemVisible, setModalAddItemVisible] = useState(false);

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
    const selectedShopObj = shopData.find(
      (shop) => shop.value === selectedValue
    );
    //店舗が選択されていなければ処理を抜ける
    if (selectedShopObj === undefined) {
      setAddFlag(false);
      return;
    }
    const newItems = items.map((item) => {
      selectedShopObj.corner.forEach((corner, index) => {
        if (item.corner === corner) {
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
        <View style={{ width: "100%" }}>
          {/* ⭐️ここかえてます⭐️ */}
          <SelectList
            setSelected={(val) => setSelectedValue(val)}
            data={shopData}
            save="shop"
            searchPlaceholder="お店を入力"
            placeholder="お店を選択"
            maxHeight={200}
            onSelect={() => directionAdd()}
          />
        </View>
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
