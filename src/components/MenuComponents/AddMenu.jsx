import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  SectionList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import moment from "moment";
import { table } from "../../../table";
import {
  createShoppingListAPI,
  fetchItemAPI,
  fetchShoppingListAPI,
} from "../../boltAPI";
import { itemPresetData } from "../../itemPreset";

export const AddMenu = ({ navigation }) => {
  const [newMenu, setNewMenu] = useState([]);
  const { menu, setMenu } = useContext(ShareShopDataContext);
  //アイテムリスト
  const { items, setItems } = useContext(ShareShopDataContext);
  //商品追加用flag
  const { addFlag, setAddFlag } = useContext(ShareShopDataContext);

  const newItems = [];

  const createAddMenu = () => {
    const updatedNewMenu = [...newMenu];
    for (const elm in menu) {
      if (elm >= moment().format("YYYY-MM-DD")) {
        for (let recipes of menu[elm]) {
          const result = {};
          result.title = recipes.recipeName;
          result.data = recipes.items;
          result.id = recipes.id;
          updatedNewMenu.push(result);
        }
      }
    }
    setNewMenu(updatedNewMenu);
  };
  useEffect(() => {
    createAddMenu();
  }, []);
  const handleCheck = (sectionId, itemIndex) => {
    const updatedData = [...newMenu];
    const updatedItem = updatedData.find((recipe) => recipe.id === sectionId);
    updatedItem.data[itemIndex].checked = !updatedItem.data[itemIndex].checked;
    setNewMenu(updatedData);
  };
  const handleAddItems = async () => {
    for (const recipe of newMenu) {
      for (const recipeItem of recipe.data) {
        if (recipeItem.checked) {
          let cornarName = (item) => {
            //下のfindでマスターitemsからitemを取り出し一致するobjを返す
            return item.itemName === recipeItem.recipeItemName;
          };
          //////////////////////////////////////////////////////////////API🔴
          let itemList = await fetchItemAPI();
          itemList = itemList.sort(function (a, b) {
            return a.createdA > b.createdA ? -1 : 1; //オブジェクトの降順ソート
          });
          itemList.push(...itemPresetData);
          let result = itemList.find(cornarName);

          if (result === undefined) {
            newItems.push({
              id: recipeItem.id,
              corner: "",
              itemName: recipeItem.recipeItemName,
              quantity: recipeItem.quantity,
              unit: recipeItem.unit,
              directions: 99,
              check: false,
              recipeId: recipe.id,
              recipeName: recipe.title,
              bought: false,
            });
          } else {
            newItems.push({
              id: recipeItem.id,
              corner: result.corner,
              itemName: recipeItem.recipeItemName,
              quantity: recipeItem.quantity,
              unit: recipeItem.unit,
              directions: 99,
              check: false,
              recipeId: recipe.id,
              recipeName: recipe.title,
              bought: false,
            });
          }
        }
      }
    }
    //追加するitemをDBに保存////////////////////////////////////////////API🔴
    const allSaveItem = async () => {
      newItems.forEach(async (newData) => {
        await createShoppingListAPI(newData);
      });
    };
    //買い物リスト一覧をDBから取得///////////////////////////////////////API🔴
    const getAllShoppingList = async () => {
      console.log("🌝🌝🌝🌝🌝🌝🌝newItems", newItems);
      const getShoppingData = await fetchShoppingListAPI();
      console.log("⭐⭐&&&&&&&&&&&&&&&⭐⭐", getShoppingData);
      setItems(getShoppingData);
    };
    await allSaveItem();

    setTimeout(function () {
      getAllShoppingList();
    }, 50);
    // setItems(newItems);
    navigation.navigate("買い物リスト");
    // setAddFlag(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.recipeArea}>
        <SectionList
          sections={newMenu}
          renderItem={({ item, index, section }) => (
            <View style={styles.item}>
              <TouchableOpacity
                style={styles.moziBox}
                onPress={() => handleCheck(section.id, index)}
              >
                {item.checked ? (
                  <AntDesign name="checkcircleo" size={24} color="black" />
                ) : (
                  <Feather name="circle" size={24} color="black" />
                )}
              </TouchableOpacity>
              <View style={styles.itemName}>
                <Text style={styles.title}>{item.recipeItemName}</Text>
              </View>
              <View style={styles.quantityUnit}>
                <Text style={styles.title}>{item.quantity}</Text>
                <Text style={styles.title}>{item.unit}</Text>
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      <View style={styles.underBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddItems()}
        >
          <Text style={styles.buttonInner}>買物リストへ追加</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
    backgroundColor: "#fff0d4", //背景色
    padding: 5,
  },
  item: {
    height: 50,
    width: "100%",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    // justifyContent: "space-between",
    fontSize: 22,
    backgroundColor: "#B6C471",
    padding: 5,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    // color: "white",
  },
  title: {
    fontSize: 18,
    // color: "white",
    // marginLeft: 10,
  },
  moziBox: {
    flex: 0.2,
    // backgroundColor: "steelblue",
    padding: 10,
    // justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  itemName: {
    flex: 0.85,
    // backgroundColor: "steelblue",
    padding: 10,
    // justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  quantityUnit: {
    flex: 0.2,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  recipeArea: {
    flex: 1,
    // justifyContent: "center",

    // alignItems: "center",
    // backgroundColor: "red",
    // height: 250,
  },
  underBar: {
    flex: 0.09,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    // backgroundColor: "red",
    // height: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontcolor: "#F5F3F0",
    height: 40,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    width: 150,
  },
  buttonInner: {
    // fontSize: 20,
    color: "white",
  },
});
