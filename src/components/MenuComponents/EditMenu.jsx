import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { table } from "../../../table";
// import { SearchBar } from "react-native-elements";
import { likeImage } from "../Common/likeImage";

export const EditMenu = ({ navigation }) => {
  const categories = [
    { id: 1, categry1: "主食" },
    { id: 2, categry1: "主菜" },
    { id: 3, categry1: "副菜" },
    { id: 4, categry1: "汁物" },
    { id: 5, categry1: "その他" },
  ];
  const defaultRecipes = table.defaultRecipes;
  const {
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    defaultServing,
    setDefaultServing,
  } = useContext(ShareShopDataContext);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  console.log("selectedRecipe1 : ", selectedRecipe);
  const [displayedRecipes, setDisplayedRecipes] = useState(
    defaultRecipes[selectedCategory]
  );
  const [serving, setServing] = useState(defaultServing);
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const [filteredRecipes, setFilteredRecipes] = useState(displayedRecipes); // 元のデータを保持する状態変数

  //選択されたレシピを献立に登録
  const handleSelectedRecipesSubmit = () => {
    const newSelectedRecipe = [...selectedRecipe];
    console.log("selectedRecipe2 : ", selectedRecipe);
    // Servingの数をselectedRecipeのitemsのquantityに掛ける　（recipeのquantityは１人前の分量が登録されている想定）
    newSelectedRecipe.forEach((recipe, indexOut) => {
      recipe.items.forEach((item, index) => {
        console.log("////////////////////////////////////", recipe.serving);
        newSelectedRecipe[indexOut].items[index].quantity =
          item.quantity * recipe.serving;
      });
    });
    console.log("changeQuantityItems!!!!!!!!!!!:", newSelectedRecipe[0].items);

    const newMenu = {
      ...menu,
      [selectedDay]: newSelectedRecipe,
    };
    "newmenu", newMenu;
    setMenu(newMenu);
    navigation.navigate("献立リスト");
  };

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setDisplayedRecipes(defaultRecipes[categoryId]);
  };
  //レシピを選択したらそのレシピ情報を引数に取ってsetSelectedRecipeに追加
  const handleRecipeSelect = (recipe) => {
    const deepCopyRecipe = JSON.parse(JSON.stringify(recipe));
    setSelectedRecipe((recipes) => [
      ...recipes,
      {
        recipeId: deepCopyRecipe.recipeId,
        categry1: deepCopyRecipe.categry1,
        recipe: deepCopyRecipe.recipe,
        url: deepCopyRecipe.url,
        serving: defaultServing,
        like: deepCopyRecipe.like,
        items: deepCopyRecipe.items,
      },
    ]);
    // 要素をレシピ表示配列から削除する
    setDisplayedRecipes((prevRecipes) =>
      prevRecipes.filter(
        (prevRecipe) => prevRecipe.recipeId !== deepCopyRecipe.recipeId
      )
    );
  };

  const handleChangeServing = (parmRecipeId, num) => {
    const newSelectedRecipe = [...selectedRecipe];
    const copySelectedRecipe = newSelectedRecipe.find(
      (recipe) => recipe.recipeId === parmRecipeId
    );
    copySelectedRecipe.serving = copySelectedRecipe.serving + num;
    setSelectedRecipe(newSelectedRecipe);
  };

  // //検索
  // const handleSearch = (text) => {
  //   setSearchKeyword(text);
  //   console.log("text//////////////", text);
  //   console.log("displayedRecipes//////////////", displayedRecipes);
  //   const filtered = displayedRecipes.filter((oneRecipe) => {
  //     console.log("oneRecipe//////////////", searchKeyword);
  //     // console.log();
  //     return oneRecipe.recipe.includes(text);
  //   });
  //   console.log("filtered/////////", filtered);
  //   // setDisplayedRecipes(filtered);
  // };

  //レンダリング↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={selectedCategory === item.id ? styles.activeTab : styles.tab}
      onPress={() => handleCategorySelect(item.id)}>
      <Text>{item.categry1}</Text>
    </TouchableOpacity>
  );
  //登録されているrecipe表示
  const renderRecipes = () => {
    // const elements = defaultRecipes[selectedCategory];
    return (
      <FlatGrid
        itemDimension={110} // 要素の幅
        data={displayedRecipes} // 表示される配列を使用する
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecipeSelect(item)}>
            <View style={styles.recipeContainer}>
              <Text style={styles.recipeText}>{likeImage(item.like)}</Text>
              <Text style={styles.recipeText}>{item.recipe}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.recipeId}
      />
    );
  };

  //追加されたレシピ表示
  const renderSelectedRecipe = () => {
    if (!selectedRecipe) {
      return null;
    }
    return (
      <View style={styles.selectedRecipeContainer}>
        {/* ヘッダー */}
        <View style={styles.selectedRecipeTab}>
          <Text style={styles.selectedRecipeTabText}>追加されたレシピ</Text>
          <AntDesign
            name="minuscircleo"
            size={17}
            color="black"
            onPress={() => setDefaultServing((prev) => prev - 1)}
          />
          <Text
            style={
              styles.selectedRecipeTabTextSmall
            }>{`デフォルト${defaultServing}人前`}</Text>
          <AntDesign
            name="pluscircleo"
            size={17}
            color="black"
            onPress={() => setDefaultServing((prev) => prev + 1)}
          />
        </View>

        {/* コンテンツ */}
        <FlatList
          data={selectedRecipe}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.recipeBox}>
                <Text>{item.recipe}</Text>
              </View>
              <View style={styles.innerBox}>
                <AntDesign
                  name="minuscircleo"
                  size={20}
                  color="black"
                  onPress={() => handleChangeServing(item.recipeId, -1)}
                />
                <Text>{`${item.serving}人前`}</Text>
                <AntDesign
                  name="pluscircleo"
                  size={20}
                  color="black"
                  onPress={() => handleChangeServing(item.recipeId, 1)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  //最初にレンダーされる
  return (
    <View style={styles.container}>
      <FlatGrid
        data={categories}
        renderItem={renderCategoryTab}
        keyExtractor={(item) => item.id.toString()}
        itemDimension={60} // 要素の幅
      />
      {/* <SearchBar
        placeholder="キーワード検索"
        onChangeText={handleSearch}
        onCancel={() => setSearchKeyword("")}
        value={searchKeyword}
      /> */}
      {renderRecipes()}
      {renderSelectedRecipe()}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSelectedRecipesSubmit}>
        <Text style={styles.buttonInner}>こんだてを登録</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  recipeContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 6,
    borderRadius: 20,
  },
  recipeText: {
    fontSize: 12,
  },
  selectedRecipeContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 10,
    height: 300,
    width: "100%",
  },
  selectedRecipeTab: {
    height: 30,
    width: "100%",
    backgroundColor: "mediumseagreen",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    // borderRadius: 20,
  },
  selectedRecipeTabText: {
    fontSize: 17,
  },
  selectedRecipeTabTextSmall: {
    fontSize: 14,
    // backgroundColor: "white",
    justifyContent: "center",
    padding: 5,
    // color: "white",
    // height: 30,
    // backgroundColor: "mediumseagreen",
    // width: "30%",
  },
  box: {
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 10,
  },
  innerBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 3,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  recipeBox: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 1,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "50%",
    marginLeft: "25%",
  },
};
