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

  const [selectedCategory, setSelectedCategory] = useState(1);

  // カテゴリ
  const categories = [
    { id: 1, category: "主食" },
    { id: 2, category: "主菜" },
    { id: 3, category: "副菜" },
    { id: 4, category: "汁物" },
    { id: 5, category: "その他" },
  ];

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <>
      <TouchableOpacity
        style={selectedCategory === item.id ? styles.activeTab : styles.tab}
        onPress={() => handleCategorySelect(item.id, item.category)}
      >
        <Text
          style={
            selectedCategory === item.id ? styles.activeTabText : styles.tabText
          }
        >
          {item.category}
        </Text>
      </TouchableOpacity>
    </>
  );

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (categoryId, categoryName) => {
    // console.log("categoryId:", categoryId);
    setSelectedCategory(categoryId);
    setDisplayedRecipes(
      recipeData.filter((item) => item.category === categoryName)
    );
  };

  useEffect(() => {
    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      setRecipeData(initRecipeData);
      setDisplayedRecipes(
        initRecipeData.filter((item) => item.category === "主食")
      );
    };
    getAllRecipe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlatGrid
          data={categories}
          renderItem={renderCategoryTab}
          keyExtractor={(item) => item.id.toString()}
          itemDimension={60} // 要素の幅
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
      <View style={styles.underBar}>
        <TouchableOpacity>
          <MaterialIcons
            onPress={() => {
              navigation.navigate("レシピ登録");
            }}
            name="add-circle-outline"
            size={35}
            color="#B45817"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0D4",
    padding: 10,
  },

  header: {},

  list: {},

  underBar: {
    alignItems: "flex-end",
    padding: 25,
    marginHorizontal: "3%",
  },

  tab: {
    padding: 10,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    padding: 10,
    backgroundColor: "#B45817",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    color: "#855E3D",
  },

  activeTabText: {
    color: "white",
  },
});
