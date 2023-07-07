import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { table } from "../../../table";
// import { SearchBar } from "react-native-elements";
import { likeImage } from "../Common/likeImage";
import {
  createMenuAPI,
  fetchDateMenuAPI,
  fetchIdRecipeAPI,
  fetchIdRecipeItemAPI,
  fetchMenuAPI,
  fetchRecipeAPI,
  fetchRecipeAndRecipeItemAPI,
} from "../../boltAPI";

export const EditMenu = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);
  //カテゴリーに該当するレシピ配列を返す
  const filterRecipes = (category) => {
    const newSelectedRecipes = recipes.filter(
      (recipe) => recipe.category === category
    );
    return newSelectedRecipes;
  };
  const categories = [
    { id: 1, category: "主食" },
    { id: 2, category: "主菜" },
    { id: 3, category: "副菜" },
    { id: 4, category: "汁物" },
    { id: 5, category: "その他" },
  ];

  useEffect(() => {
    const renderRecipes = [];
    // レシピの一覧を取得
    const getAllRecipe = async () => {
      //登録されている全てのrecipeを取得
      const newRecipes = await fetchRecipeAPI();
      //全てのrecipeのrecipeItemを取得
      newRecipes.forEach(async (newRecipe, indexOut) => {
        const getedRecipeItems = await fetchIdRecipeItemAPI(newRecipe.id);
        // //quantityを全て１人前になるようにservingで割る
        // getedRecipeItems.forEach((item) => {
        //   item.quantity = item.quantity / newRecipe.serving;
        //   item.checked = true;
        // });
        //データを加工したら更新
        renderRecipes.push({
          id: newRecipe.id,
          category: newRecipe.category,
          recipeName: newRecipe.recipeName,
          url: newRecipe.url,
          serving: newRecipe.serving,
          like: newRecipe.like,
          items: getedRecipeItems,
        });
      });
      // console.log("$$$$$$$$$$$$$$$$$$$", renderRecipes);
      setTimeout(function () {
        setRecipes(renderRecipes);
        setRenderFlag(true);
      }, 50);
    };
    getAllRecipe();
  }, []);

  const {
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    defaultServing,
    setDefaultServing,
    setAllGetMenuFlag,
  } = useContext(ShareShopDataContext);
  const [selectedCategory, setSelectedCategory] = useState("主食");
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [serving, setServing] = useState(defaultServing);
  const [saveFlag, setSaveFlag] = useState(false);
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const [filteredRecipes, setFilteredRecipes] = useState(displayedRecipes); // 元のデータを保持する状態変数

  //選択されたレシピを献立に登録
  const handleSelectedRecipesSubmit = async () => {
    const newSelectedRecipe = [...selectedRecipe];
    // Servingの数をselectedRecipeのitemsのquantityに掛ける　（recipeのquantityは１人前の分量が登録されている想定）
    newSelectedRecipe.forEach((recipe, indexOut) => {
      newSelectedRecipe[indexOut].date = selectedDay;
      // recipe.items.forEach((item, index) => {
      //   newSelectedRecipe[indexOut].items[index].quantity =
      //     item.quantity * recipe.serving;
      // });
    });

    // 献立登録用のデータを加工→献立保存
    const saveMenu = async () => {
      // console.log("newSelectedRecipe:", newSelectedRecipe);
      const result = await Promise.all(
        newSelectedRecipe.map((recipe) => {
          const saveData = {
            date: selectedDay,
            recipeID: recipe.id,
            menuServing: recipe.serving,
          };
          return createMenuAPI(saveData);
        })
      );
      console.log("-------------result 155-----------", result);
    };

    await saveMenu();
    setAllGetMenuFlag((prev) => !prev);
    //新しいmenuを取得
    // setTimeout(function () {
    //   getNewMenu(selectedDay);
    // }, 50);

    await navigation.navigate("献立リスト");
  };
  // console.log("newMenu!!!!!!!!!!!!!!!", menu);

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDisplayedRecipes(filterRecipes(category));
  };
  //レシピを選択したらそのレシピ情報を引数に取ってsetSelectedRecipeに追加
  const handleRecipeSelect = (recipe) => {
    const deepCopyRecipe = JSON.parse(JSON.stringify(recipe));
    setSelectedRecipe((recipes) => [
      ...recipes,
      {
        id: deepCopyRecipe.id,
        category: deepCopyRecipe.category,
        recipeName: deepCopyRecipe.recipeName,
        url: deepCopyRecipe.url,
        serving: defaultServing,
        like: deepCopyRecipe.like,
        items: deepCopyRecipe.items,
      },
    ]);
    // 要素をレシピ表示配列から削除する
    setDisplayedRecipes((prevRecipes) =>
      prevRecipes.filter((prevRecipe) => prevRecipe.id !== deepCopyRecipe.id)
    );
  };

  const handleChangeServing = (parmRecipeId, num) => {
    const newSelectedRecipe = [...selectedRecipe];
    const copySelectedRecipe = newSelectedRecipe.find(
      (recipe) => recipe.id === parmRecipeId
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
  //     return oneRecipe.recipeName.includes(text);
  //   });
  //   console.log("filtered/////////", filtered);
  //   // setDisplayedRecipes(filtered);
  // };

  if (renderFlag) {
    setDisplayedRecipes(filterRecipes(selectedCategory));
    setRenderFlag(false);
  }
  //レンダリング↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={selectedCategory === item.category ? styles.activeTab : styles.tab}
      onPress={() => handleCategorySelect(item.category)}
    >
      <Text>{item.category}</Text>
    </TouchableOpacity>
  );
  //登録されているrecipe表示
  const renderRecipes = () => {
    // const elements = recipes[selectedCategory];
    return (
      <FlatGrid
        itemDimension={110} // 要素の幅
        data={displayedRecipes} // 表示される配列を使用する
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecipeSelect(item)}>
            <View style={styles.recipeContainer}>
              <Text style={styles.recipeText}>{likeImage(item.like)}</Text>
              <Text style={styles.recipeText}>{item.recipeName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
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
            style={styles.selectedRecipeTabTextSmall}
          >{`デフォルト${defaultServing}人前`}</Text>
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
                <Text>{item.recipeName}</Text>
              </View>
              <View style={styles.innerBox}>
                <AntDesign
                  name="minuscircleo"
                  size={20}
                  color="black"
                  onPress={() => handleChangeServing(item.id, -1)}
                />
                <Text>{`${item.serving}人前`}</Text>
                <AntDesign
                  name="pluscircleo"
                  size={20}
                  color="black"
                  onPress={() => handleChangeServing(item.id, 1)}
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
        onPress={handleSelectedRecipesSubmit}
      >
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
