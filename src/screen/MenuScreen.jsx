import React, { useContext, useEffect } from "react";
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
import { MenuList } from "../components/MenuComponents/MenuList";
import {
  fetchDateMenuAPI,
  fetchMenuAPI,
  fetchRecipeAndRecipeItemAPI,
} from "../boltAPI";
import { ShareShopDataContext } from "./ShareShopDataContext";

export const MenuScreen = ({ navigation }) => {
  const { menu, setMenu, allGetMenuFlag, setAllGetMenuFlag } =
    useContext(ShareShopDataContext);

  //選択した日付のレシピを取得してmenuを更新
  const getNewMenu = async (day) => {
    const newRecipeArray = [];
    // 保存したmenuを取り出し;
    const fetchMenu = await fetchDateMenuAPI(day);
    //取得したmenuを回す
    fetchMenu.forEach(async (recipe) => {
      const getedRecipe = await fetchRecipeAndRecipeItemAPI(recipe.recipeID);
      const addArray = [];
      //取得したレシピのitemsをループ
      getedRecipe.items.forEach((item, index) => {
        // console.log("&&&&&&&&&&&&&&&前⭐⭐", item.quantity);
        //追加するitemObjを加工
        const addObjItem = {
          id: item.id,
          checked: true,
          recipeItemName: item.recipeItemName,
          quantity: (item.quantity / getedRecipe.serving) * recipe.menuServing,
          unit: item.unit,
        };
        // レシピのitemsを更新するようの配列
        addArray.push(addObjItem);
      });
      // recipeObj用のobj
      const recipeObj = {
        id: getedRecipe.id,
        menuId: recipe.id,
        category: getedRecipe.category,
        recipeName: getedRecipe.recipeName,
        url: getedRecipe.url,
        serving: getedRecipe.serving,
        like: getedRecipe.like,
        items: addArray,
      };
      newRecipeArray.push(recipeObj);
      setMenu(
        (prevMenu) => (prevMenu = { ...prevMenu, [day]: newRecipeArray })
      );
    });
  };

  //全てのMenuを取得
  useEffect(() => {
    const allGetMenu = async () => {
      // まず全てのmenuを取得
      const allGetMenu = await fetchMenuAPI();
      // 日付のみの配列に変形
      const filteredDate = Array.from(
        new Set(allGetMenu.map((menu) => menu.date))
      );
      console.log("filterDate:::::::::::", filteredDate);
      // 日付のみの配列を回して
      filteredDate.forEach((day) => {
        getNewMenu(day);
      });
    };
    console.log("⭐⭐⭐⭐⭐⭐⭐⭐", allGetMenuFlag);
    allGetMenu();
  }, [allGetMenuFlag]);
  // console.log("⭐⭐⭐!!!!!!!!!!!!!!!", menu);

  return (
    <View>
      <MenuList navigation={navigation} />
    </View>
  );
};
