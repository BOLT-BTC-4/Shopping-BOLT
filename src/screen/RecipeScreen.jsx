import React, { useEffect, useState, useContext } from "react";
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
import { RecipeList } from "../components/RecipeComponents/RecipeList.jsx";
import { ShareShopDataContext } from "./ShareShopDataContext";
import { MaterialIcons } from "@expo/vector-icons";
import {
  fetchRecipeAPI,
  deleteRecipeAPI,
  fetchRecipeAndRecipeItemAPI,
} from "../boltAPI";
import { FlatGrid } from "react-native-super-grid";

export const RecipeScreen = ({ navigation }, item) => {
  console.log("===== comp_RecipeScreen =====");
  const {
    recipeData,
    setRecipeData,
    updateRecipe,
    setUpdateRecipe,
    updateRecipeItem,
    setUpdateRecipeItem,
    displayedRecipes,
    setDisplayedRecipes,
    selectedCategory,
    setSelectedCategory,
  } = useContext(ShareShopDataContext);

  // 選択したレシピの削除 → レシピ一覧の取得
  const handleRemoveItem = async (id) => {
    await deleteRecipeAPI(id);
    const initRecipeData = await fetchRecipeAPI();
    setRecipeData(initRecipeData);
    setDisplayedRecipes(
      initRecipeData.filter((item) => item.category === "主食")
    );
  };

  //
  const handleEditRecipe = async (id) => {
    const getRecipeAndRecipeItem = await fetchRecipeAndRecipeItemAPI(id);
    await setUpdateRecipe(getRecipeAndRecipeItem);
    await setUpdateRecipeItem(getRecipeAndRecipeItem.items);
    // console.log("RecipeScreen_getRecipeAndRecipeItem:", getRecipeAndRecipeItem);
    navigation.navigate("レシピ編集", { item });
  };

  // カテゴリ毎にレシピ一覧を表示させる
  // カテゴリ
  const categories = [
    { id: 1, category: "全て" },
    { id: 2, category: "主食" },
    { id: 3, category: "主菜" },
    { id: 4, category: "副菜" },
    { id: 5, category: "汁物" },
    { id: 6, category: "スイーツ" },
    { id: 7, category: "その他" },
  ];

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <>
      <TouchableOpacity
        style={
          selectedCategory === item.category ? styles.activeTab : styles.tab
        }
        onPress={() => handleCategorySelect(item.category)}
      >
        <Text>{item.category}</Text>
      </TouchableOpacity>
    </>
  );

  //カテゴリーに該当するレシピ配列を返す
  const filterRecipes = (category) => {
    if (category === "全て") {
      const newRecipes = [...recipeData];
      return newRecipes;
    } else {
      const newSelectedRecipes = recipeData.filter(
        (recipe) => recipe.category === category
      );
      return newSelectedRecipes;
    }
  };
  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (categoryName) => {
    // console.log("categoryId:", categoryId);
    setSelectedCategory(categoryName);
    setDisplayedRecipes(filterRecipes(categoryName));
  };

  useEffect(() => {
    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      setRecipeData(initRecipeData);
      // setDisplayedRecipes(
      //   initRecipeData.filter((item) => item.category === "主食")
      // );
      setDisplayedRecipes(initRecipeData);
    };
    getAllRecipe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.categoryBar}>
        <FlatGrid
          data={categories}
          renderItem={renderCategoryTab}
          keyExtractor={(item) => item.id.toString()}
          itemDimension={70} // 要素の幅
        />
      </View>

      <FlatList
        style={styles.list}
        data={displayedRecipes}
        renderItem={({ item }) => (
          <RecipeList
            recipeName={item.recipeName}
            navigation={navigation}
            // handleCheck={handleCheck}
            handleEditRecipe={handleEditRecipe}
            handleRemoveItem={handleRemoveItem}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addbtn}
        onPress={() => {
          navigation.navigate("レシピ登録");
        }}
      >
        <MaterialIcons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  categoryBar: {
    flex: 0.3,
    // height: 95,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
  },
  list: {},

  addbtn: {
    alignItems: "center",
    padding: 10,
  },
  tab: {
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "#B6C471",
    borderRightColor: "#B6C471",
    borderTopColor: "#B6C471",
    // justifyContent: "center",
  },
  activeTab: {
    padding: 5,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "#B6C471",
    borderRightColor: "#B6C471",
    borderTopColor: "#B6C471",
    // justifyContent: "center",
  },
});
