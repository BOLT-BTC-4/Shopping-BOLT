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
  //カテゴリーに該当するレシピ配列を返す
  const filterRecipes = (category) => {
    if (category === "全て") {
      const newRecipes = [...recipes];
      return newRecipes;
    } else {
      const newSelectedRecipes = recipes.filter(
        (recipe) => recipe.category === category
      );
      return newSelectedRecipes;
    }
  };
  const categories = [
    { id: 1, category: "全て" },
    { id: 2, category: "主食" },
    { id: 3, category: "主菜" },
    { id: 4, category: "副菜" },
    { id: 5, category: "汁物" },
    { id: 6, category: "スイーツ" },
    { id: 7, category: "その他" },
  ];

  useEffect(() => {
    const renderRecipes = [];
    // レシピの一覧を取得
    const getAllRecipe = async () => {
      //登録されている全てのrecipeを取得
      const newRecipes = await fetchRecipeAPI();
      //全てのrecipeのrecipeItemを取得
      const getedRecipeItems = await Promise.all(
        newRecipes.map((newRecipe) => fetchIdRecipeItemAPI(newRecipe.id))
      );
      console.log(
        "------------getedRecipeItems------55--------",
        getedRecipeItems
      );
      newRecipes.forEach((newRecipe, index) => {
        //データを加工したら更新
        renderRecipes.push({
          id: newRecipe.id,
          category: newRecipe.category,
          recipeName: newRecipe.recipeName,
          url: newRecipe.url,
          memo: newRecipe.memo,
          serving: newRecipe.serving,
          like: newRecipe.like,
          items: getedRecipeItems[index],
        });
      });
      console.log("---------renderRecipes-----65--------", renderRecipes[1]);
      setRecipes(renderRecipes);
      setDisplayedRecipes(renderRecipes);
    };
    getAllRecipe(); ///////////////////////////////////////////////////////////////////useEffect🔴
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
  const [selectedCategory, setSelectedCategory] = useState("全て");
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [serving, setServing] = useState(defaultServing);
  const [saveFlag, setSaveFlag] = useState(false);
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const [filteredRecipes, setFilteredRecipes] = useState(displayedRecipes); // 元のデータを保持する状態変数

  //選択されたレシピを献立に登録
  const handleSelectedRecipesSubmit = async () => {
    const newSelectedRecipe = [...selectedRecipe];
    newSelectedRecipe.forEach((recipe, indexOut) => {
      newSelectedRecipe[indexOut].date = selectedDay;
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
    //新しいmenuを取得
    setAllGetMenuFlag((prev) => !prev);
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
    setRecipes((prevRecipes) =>
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

  //レンダリング↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={selectedCategory === item.category ? styles.activeTab : styles.tab}
      onPress={() => handleCategorySelect(item.category)}
    >
      <Text
        style={
          selectedCategory === item.category
            ? styles.activeTabText
            : styles.tabText
        }
      >
        {item.category}
      </Text>
    </TouchableOpacity>
  );
  //登録されているrecipe表示
  const renderRecipes = () => {
    // const elements = recipes[selectedCategory];
    return (
      <View style={styles.recipeArea}>
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
      </View>
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
          <View style={styles.selectedRecipeTabTextBox}>
            <Text style={styles.selectedRecipeTabText}>追加したレシピ</Text>
          </View>
          <View style={styles.selectedRecipeTabServingBox}>
            <AntDesign
              name="minuscircleo"
              size={20}
              color="black"
              onPress={() => setDefaultServing((prev) => prev - 1)}
            />
            <Text
              style={styles.selectedRecipeTabTextSmall}
            >{`デフォルト${defaultServing}人前`}</Text>
            <AntDesign
              name="pluscircleo"
              size={20}
              color="black"
              onPress={() => setDefaultServing((prev) => prev + 1)}
            />
          </View>
        </View>

        {/* コンテンツ */}
        <FlatList
          data={selectedRecipe}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.recipeBox}>
                <Text>{item.recipeName}</Text>
              </View>
              <View style={styles.iconBox}>
                <AntDesign
                  name="minuscircleo"
                  size={17}
                  color="black"
                  onPress={() => handleChangeServing(item.id, -1)}
                />
                <Text>{`${item.serving}人前`}</Text>
                <AntDesign
                  name="pluscircleo"
                  size={17}
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

  //最初にレンダーされる　カテゴリバー
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
      {/* <SearchBar
        placeholder="キーワード検索"
        onChangeText={handleSearch}
        onCancel={() => setSearchKeyword("")}
        value={searchKeyword}
      /> */}
      {renderRecipes()}
      {renderSelectedRecipe()}
      <View style={styles.underBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSelectedRecipesSubmit}
        >
          <Text style={styles.buttonInner}>登録</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff0d4", //背景色
    padding: 5,
  },
  categoryBar: {
    flex: 0.5,
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
  tab: {
    padding: 5,
    // padding: 10,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    padding: 5,
    // backgroundColor: "#B6C471",
    // borderRadius: 20,
    // alignItems: "center",
    // borderWidth: 1.5,
    // borderBottomColor: "#B6C471",
    // borderLeftColor: "#B6C471",
    // borderRightColor: "#B6C471",
    // borderTopColor: "#B6C471",
    // justifyContent: "center",
    // padding: 10,
    backgroundColor: "#B45817",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#855E3D",
    fontWeight: "bold",
  },

  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  recipeArea: {
    flex: 1.5,
    // backgroundColor: "red",
    // height: 250,
  },
  recipeContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "#B6C471",
    borderRightColor: "#B6C471",
    borderTopColor: "#B6C471",
    // backgroundColor: "#B6C471",
    padding: 6,
    borderRadius: 20,
  },
  recipeText: {
    fontSize: 12,
    // color: "white",
  },
  selectedRecipeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightgreen",
    // padding: 20,
    marginVertical: 3,
    // height: 200,
    // width: "100%",
  },
  selectedRecipeTab: {
    height: 30,
    width: "100%",
    // backgroundColor: "#B6C471",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    // borderRadius: 20,
  },
  selectedRecipeTabTextBox: {
    paddingLeft: 25,
  },
  selectedRecipeTabServingBox: {
    width: 170,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    // flex: 1,
    width: "100%",
    // height: 30,
    borderWidth: 1,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    // paddingLeft: 10,
    // paddingRight: 10,
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 10,
  },
  recipeBox: {
    // flex: 0.5,
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    padding: 5,
  },
  iconBox: {
    // width: "10%",
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  underBar: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
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
    width: 120,
  },
  buttonInner: {
    // fontSize: 20,
    color: "white",
  },
};
