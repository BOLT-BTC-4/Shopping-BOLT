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

export const AddMenu = ({ navigation }) => {
  const [newMenu, setNewMenu] = useState([]);
  const { menu, setMenu } = useContext(ShareShopDataContext);
  //アイテムリスト
  const { items, setItems } = useContext(ShareShopDataContext);
  //商品追加用flag
  const { addFlag, setAddFlag } = useContext(ShareShopDataContext);

  const newItems = [...items];

  const createAddMenu = () => {
    const updatedNewMenu = [...newMenu];
    for (const elm in menu) {
      if (elm >= moment().format("YYYY-MM-DD")) {
        for (let recipes of menu[elm]) {
          const result = {};
          result.title = recipes.recipe;
          result.data = recipes.items;
          result.recipeId = recipes.recipeId;
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
    const updatedItem = updatedData.find(
      (recipe) => recipe.recipeId === sectionId
    );
    updatedItem.data[itemIndex].checked = !updatedItem.data[itemIndex].checked;
    setNewMenu(updatedData);
  };
  "newMenu:", newMenu;

  const handleAddItems = () => {
    for (const recipe of newMenu) {
      for (const recipeItem of recipe.data) {
        if (recipeItem.checked) {
          "recipe:", recipe;
          let cornarName = (item) => {
            //下のfindでマスターitemsからitemを取り出し一致するobjを返す
            return item.itemName === recipeItem.recipeItemName;
          };
          let result = table.masterItem.find(cornarName);
          // (result);
          if (result === undefined) {
            newItems.push({
              id: recipeItem.itemId,
              corner: "",
              itemName: recipeItem.recipeItemName,
              quantity: recipeItem.quantity,
              unit: recipeItem.unit,
              directions: 99,
              check: false,
              recipeId: recipe.recipeId,
              recipe: recipe.title,
            });
          } else {
            newItems.push({
              id: recipeItem.itemId,
              corner: result.corner,
              itemName: recipeItem.recipeItemName,
              quantity: recipeItem.quantity,
              unit: recipeItem.unit,
              directions: 99,
              check: false,
              recipeId: recipe.recipeId,
              recipe: recipe.title,
            });
          }
        }
      }
    }
    setItems(newItems);
    navigation.navigate("献立リスト");
    // setAddFlag(true);
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={newMenu}
        renderItem={({ item, index, section }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.moziBox}
              onPress={() => handleCheck(section.recipeId, index)}
            >
              {item.checked ? (
                <AntDesign name="checkcircleo" size={24} color="black" />
              ) : (
                <Feather name="circle" size={24} color="black" />
              )}
              <Text style={styles.title}>{item.recipeItemName}</Text>
              <Text style={styles.title}>{item.quantity}</Text>
              <Text style={styles.title}>{item.unit}</Text>
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        keyExtractor={(item, index) => item.itemId}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleAddItems()}>
        <Text style={styles.buttonInner}>買物リストへ追加</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    fontSize: 24,
    backgroundColor: "mediumseagreen",
    padding: 5,
  },
  title: {
    fontSize: 20,
  },
  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    marginTop: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "50%",
    marginLeft: "25%",
  },
  buttonInner: {
    fontSize: 20,
  },
});
