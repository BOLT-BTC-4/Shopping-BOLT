import React, { useContext, useState } from "react";
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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import moment from "moment";

const DATA = [
  {
    title: "俺の唐揚げ",
    data: [
      ["パン", "2個"],
      ["肉", "300g"],
    ],
  },
  {
    title: "俺のチャーハン",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "副菜",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "汁物",
    data: ["Cheese Cake", "Ice Cream"],
  },
];
const newMenu = [];
export const AddMenu = ({ navigation }) => {
  const { selectedDay, setSelectedDay, selectedMenu, setSelectedMenu } =
    useContext(ShareShopDataContext);
  const createAddMenu = () => {
    for (const elm in selectedMenu) {
      if (elm >= moment().format("YYYY-MM-DD")) {
        console.log("////////////", selectedMenu[elm]);
        for (let recipes of selectedMenu[elm]) {
          console.log("?????", recipes);
          const result = {};
          result.title = recipes.recipe;
          result.data = recipes.items;
          newMenu.push(result);
        }
      }
    }
    console.log("newMenu", newMenu);
  };
  createAddMenu();
  // const handleMenuSubmit = () => {
  //   const newSelectedMenu = {
  //     ...selectedMenu,
  //     [selectedDay]: selectedElement,
  //   };
  //   setSelectedMenu(newSelectedMenu);
  //   navigation.navigate("献立リスト");
  // };
  //  const handleCheck = (localId) => {
  //    const newItems = [...items];
  //    const item = newItems.find((item) => item.localId === localId);
  //    item.check = !item.check;
  //    setItems(newItems);
  //  };
  return (
    <View style={styles.container}>
      {/* <Text>{moment().format("YYYY-MM-DD")}</Text> */}
      <SectionList
        sections={newMenu}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.moziBox}>
              <AntDesign name="checkcircleo" size={24} color="black" />
              <Text style={styles.title}>{item}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
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
  },
  title: {
    fontSize: 16,
  },
  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
