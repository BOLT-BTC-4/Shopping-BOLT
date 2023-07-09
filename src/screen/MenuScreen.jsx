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
  const getNewMenu = async (filteredDate) => {
    let newMenuObj = {};
    //(レンダリング用)
    const newRecipeArray = [];
    // 保存したmenuを取り出し;
    const fetchMenu = await Promise.all(
      filteredDate.map((day) => fetchDateMenuAPI(day))
    );
    console.log("fetchMenu ------------43------------", fetchMenu);
    // const menuLoop = async () => {
    //取得したmenuを回す
    const getRecipeArray = [];
    for (const arrayOut of fetchMenu) {
      for (const arrayIn of arrayOut) {
        getRecipeArray.push(arrayIn);
      }
    }
    console.log("getRecipeArray ---------62------------", getRecipeArray);
    // const getRecipeID = fetchMenu.map((recipe) => recipe);

    const getedRecipes = await Promise.all(
      getRecipeArray.map((recipe) =>
        fetchRecipeAndRecipeItemAPI(recipe.recipeID)
      )
    );
    console.log("getedRecipes ---------68------------", getedRecipes);

    //取得したメニューを１つずつ取り出し
    for (const oneMenu of getRecipeArray) {
      //レシピIDが一致するものをgetedRecipesから取得
      findedOneRecipe = getedRecipes.find(
        (oneRecipe) => oneRecipe.id === oneMenu.recipeID
      );
      console.log("findedOneRecipe ---------77------------", findedOneRecipe);
      const addArray = [];
      for (const item of findedOneRecipe.items) {
        //追加するitemObjを加工
        const addObjItem = {
          id: item.id,
          checked: true,
          recipeItemName: item.recipeItemName,
          quantity:
            (item.quantity / findedOneRecipe.serving) * oneMenu.menuServing,
          unit: item.unit,
        };
        // レシピのitemsを更新するようの配列
        addArray.push(addObjItem);
      }
      console.log("addArray ---------93------------", addArray);
      // recipeObj用のobj(レンダリング用)
      const recipeObj = {
        id: findedOneRecipe.id, //recipeIDのこと
        menuId: oneMenu.id,
        category: findedOneRecipe.category,
        recipeName: findedOneRecipe.recipeName,
        url: findedOneRecipe.url,
        serving: oneMenu.menuServing,
        like: findedOneRecipe.like,
        items: addArray,
      };
      console.log("recipeObj ---------105------------", recipeObj);
      //もし日付に値があればrecipeObjをプッシュする
      if (newMenuObj[oneMenu.date]) {
        newMenuObj[oneMenu.date].push(recipeObj);
      } else {
        newMenuObj[oneMenu.date] = [recipeObj];
      }
    }
    console.log("newMenuObj ---------113------------", newMenuObj);
    setMenu(newMenuObj);
  };

  const allGetMenu = async () => {
    newMenuObj = {};
    // まず全てのmenuを取得
    const allGetMenu = await fetchMenuAPI();
    // 日付のみの配列に変形
    const filteredDate = Array.from(
      new Set(allGetMenu.map((menu) => menu.date))
    );
    console.log("filterDate:::::::::::", filteredDate);
    // データがDBにあれば日付のみの配列を回して最新のmenuをDBから取得する
    if (filteredDate.length >= 1) {
      getNewMenu(filteredDate);
    } else {
      setMenu({});
    }
  };

  //Promise.allチャレンジ
  //全てのMenuを取得
  useEffect(() => {
    const allGetMenu = async () => {
      // newMenuObj = {};
      // まず全てのmenuを取得
      const allGetMenu = await fetchMenuAPI();
      // 日付のみの配列に変形
      const filteredDate = Array.from(
        new Set(allGetMenu.map((menu) => menu.date))
      );
      console.log("filterDate:::::::::::", filteredDate);
      // データがDBにあれば日付のみの配列を回して最新のmenuをDBから取得する
      if (filteredDate.length >= 1) {
        getNewMenu(filteredDate);
      } else {
        setMenu({});
      }
    };
    ///////////////////////////////////////////////////////////////////////////API利用
    allGetMenu();
  }, [allGetMenuFlag]);
  // console.log("⭐⭐⭐!!!!!!!!!!!!!!!", menu);

  return (
    <View style={styles.container}>
      <MenuList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0d4", //買い物リストの背景色
    // padding: 10,
    // // justifyContent: "center",
    // alignContent: "center",
  },
});
//一旦対比後プッシュ
