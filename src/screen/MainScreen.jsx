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
import {
  fetchShoppingListAPI,
  deleteShoppingListAPI,
  updateShoppingListAPI,
  fetchShopAPI,
  dataClearAPI,
} from "../boltAPI";

export const MainScreen = ({ navigation }) => {
  console.log("===== comp_MainScreen =====");
  //アイテムリスト
  const { items, setItems, allGetItemFlag, setAllGetItemFlag } =
    useContext(ShareShopDataContext);

  //商品追加用flag
  const { addFlag, setAddFlag } = useContext(ShareShopDataContext);

  // Shop関連のuseState
  // 買物/お店タブで利用するため2つともContext化
  const { selectedValue, setSelectedValue } = useContext(ShareShopDataContext);

  // shopタブでも利用するため下記のshopDataに名称変更
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  const { shopDataDrop, setShopDataDrop } = useContext(ShareShopDataContext);

  useEffect(() => {
    // // 買い物リスト一覧の取得
    const getAllShoppingList = async () => {
      const shoppingListData = await fetchShoppingListAPI();
      console.log("------shoppingListData----47----::", shoppingListData);
      setItems(shoppingListData);
    };
    navigation.navigate("買い物リスト");
    //////////////////////////////////////////////////////////////////////////UseEffect!API🔴
    getAllShoppingList();
  }, [allGetItemFlag]);

  useEffect(() => {
    // お店の一覧を取得
    const getAllShop = async () => {
      const initShopData = await fetchShopAPI();
      //ドロップダウンで利用できるようにオブジェクトキー変更
      const getArrayDropDownList = initShopData.map((item) => {
        return { key: item.id, value: item.shopName, corner: item.corner };
      });
      console.log("------shoppingListData----64----::", getArrayDropDownList);
      setShopData(initShopData);
      setShopDataDrop(getArrayDropDownList);
    };
    getAllShop();
  }, []);

  // モーダルのuseState
  const [modalAddItemVisible, setModalAddItemVisible] = useState(false);

  const handleCheck = (id) => {
    const newItems = [...items];
    const item = newItems.find((item) => item.id === id);
    item.check = !item.check;
    setItems(newItems);
  };

  // 選択した買い物リストアイテムの削除 → 買い物リスト一覧の取得
  const handleRemoveItem = async (id) => {
    ///////////////////////////////////////////////////////////////API🔴
    await deleteShoppingListAPI(id);
    // await dataClearAPI();
    const shoppingListData = await fetchShoppingListAPI();
    setItems(shoppingListData);
    const newFlag = true;
    setAddFlag(newFlag);
  };

  const handleAllRemoveItem = async () => {
    //買い物リスト一覧をDBからboughtがfalseのもののみ取得
    const getAllShoppingList = async () => {
      ///////////////////////////////////////////////////////////////API🔴
      const getShoppingData = await fetchShoppingListAPI();
      setItems(getShoppingData);
      const newFlag = true;
      setAddFlag(newFlag);
    };
    const newBoughtedItems = [...items];
    // //DB上のshoppinglistを更新
    const updateShoppingList = async () => {
      newBoughtedItems.forEach(async (item) => {
        if (item.check) {
          item.bought = true;
          ///////////////////////////////////////////////////////////////API🔴
          await updateShoppingListAPI(item);
          getAllShoppingList();
        }
      });
    };
    updateShoppingList();
    // // const newItems = items.filter((item) => item.check === false);
    // setItems(newBoughtedItems);
  };

  // console.log("-----------items 114-------", items);

  //順番付与
  const directionAdd = () => {
    // console.log(shopData);
    const selectedShopObj = shopDataDrop.find(
      (shop) => shop.value === selectedValue
    );
    //店舗が選択されていなければ処理を抜ける
    if (selectedShopObj === undefined) {
      const newFlag = false;
      setAddFlag(newFlag);
      return;
    }

    const newItems = items.map((item) => {
      // console.log("----------------129-----------：", item);
      if (selectedShopObj.corner.indexOf(item.corner) !== -1) {
        item.directions = selectedShopObj.corner.indexOf(item.corner);
      } else {
        item.directions = 99;
      }
      // selectedShopObj.corner.forEach((shopCorner, index) => {
      //   if (item.corner === shopCorner) {
      //     item.directions = index;
      //     return;
      //   } else {
      //     item.directions = 99;
      //   }
      // });
      console.log("------144---item------", item);
      return item;
    });
    //ソート
    newItems.sort(function (a, b) {
      if (a.directions > b.directions) return 1;
      if (b.directions > a.directions) return -1;
      return 0;
    });
    setItems(newItems);
    const newFlag = false;
    setAddFlag(newFlag);
  };

  if (addFlag) {
    directionAdd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.shopselect}>
        <View style={{ width: "100%" }}>
          <SelectList
            setSelected={(val) => setSelectedValue(val)}
            data={shopDataDrop}
            save="value"
            searchPlaceholder="お店を入力"
            placeholder="お店を選択"
            maxHeight={200}
            // defaultOption={shopData[0]}
            onSelect={() => {
              directionAdd();
            }}
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
        <TouchableOpacity
          style={styles.buyButton}
          onPress={handleAllRemoveItem}
        >
          <Text style={styles.buttonText}>購入したよ</Text>
        </TouchableOpacity>
        <MaterialIcons
          onPress={() => setModalAddItemVisible(true)}
          name="add-shopping-cart"
          size={35}
          color="#B45817"
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
    backgroundColor: "#fff0d4", //買い物リストの背景色
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
  underBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    marginRight: 30,
    marginLeft: 10,
    marginTop: 10,
  },
  buyButton: {
    //購入したよ　ボタン
    // marginTop: 5,
    // marginVertical: "20%",
    justifyContent: "center",
    alignItems: "center",
    fontcolor: "#F5F3F0",
    height: 40,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    width: 120,
    // marginLeft: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
