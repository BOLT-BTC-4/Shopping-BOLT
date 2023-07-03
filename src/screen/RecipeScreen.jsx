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
import { fetchRecipeAPI, deleteRecipeAPI } from "../boltAPI";

export const RecipeScreen = ({ navigation }) => {
  console.log("===== comp_RecipeScreen =====");
  const { recipeData, setRecipeData } = useContext(ShareShopDataContext);

  const handleRemoveItem = async (id) => {
    // 選択したレシピの削除
    await deleteRecipeAPI(id);
    const initRecipeData = await fetchRecipeAPI();
    setRecipeData(initRecipeData);
  };

  useEffect(() => {
    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      console.log("initRecipeData:", initRecipeData);
      setRecipeData(initRecipeData);
    };
    getAllRecipe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={recipeData}
        renderItem={({ item }) => (
          <RecipeList
            recipeName={item.recipeName}
            navigation={navigation}
            // handleCheck={handleCheck}
            handleRemoveItem={handleRemoveItem}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addbtn}
        onPress={() => {
          navigation.navigate("レシピ登録/編集");
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
  list: {},

  addbtn: {
    alignItems: "center",
    padding: 10,
  },
});
