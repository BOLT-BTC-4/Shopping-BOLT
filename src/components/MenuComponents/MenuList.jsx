import React, { useContext } from "react";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  deleteMenuAPI,
  fetchDateMenuAPI,
  fetchMenuAPI,
  fetchRecipeAndRecipeItemAPI,
} from "../../boltAPI";

export const MenuList = ({ navigation }) => {
  const {
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    allGetMenuFlag,
    setAllGetMenuFlag,
  } = useContext(ShareShopDataContext);

  //選択した日付のレシピを取得してmenuを更新
  let newMenuObj = {};
  const getNewMenu = async (filteredDate) => {
    //(レンダリング用)
    const newRecipeArray = [];
    // 保存したmenuを取り出し;
    const fetchMenu = await Promise.all(
      filteredDate.map((day) => fetchDateMenuAPI(day))
    );
    console.log("fetchMenu ------------43------------", fetchMenu);
    // const menuLoop = async () => {
    //取得したmenuを回す
    // for (const recipe of fetchMenu) {
    // fetchMenu.forEach(async (recipe) => {
    const getRecipeArray = [];
    for (const arrayOut of fetchMenu) {
      for (const arrayIn of arrayOut) {
        getRecipeArray.push(arrayIn);
      }
    }
    // const pushRecipeId = [];
    // const dayToRecipeId = {};
    // for (const arrayOut of fetchMenu) {
    //   for (const arrayIn of arrayOut) {
    //     dayToRecipeId[arrayIn.date] = pushRecipeId.push(arrayIn.recipeID);
    //   }
    // }
    // console.log("dayToRecipeId ---------61------------", dayToRecipeId);
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
    // for (const recipe of getedRecipes) {
    //   for (const item of recipe) {
    //     //追加するitemObjを加工
    //     const addObjItem = {
    //       id: item.id,
    //       checked: true,
    //       recipeItemName: item.recipeItemName,
    //       quantity: (item.quantity / getedRecipes.serving) * recipe.menuServing,
    //       unit: item.unit,
    //     };
    //     // レシピのitemsを更新するようの配列
    //     addArray.push(addObjItem);
    //   }
    //   // recipeObj用のobj(レンダリング用)
    //   const recipeObj = {
    //     id: getedRecipes.id, //recipeIDのこと
    //     menuId: recipe.id,
    //     category: getedRecipes.category,
    //     recipeName: getedRecipes.recipeName,
    //     url: getedRecipes.url,
    //     serving: recipe.menuServing,
    //     like: getedRecipes.like,
    //     items: addArray,
    //   };
    //   newRecipeArray.push(recipeObj);
    //   console.log("getNewMenuの中⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐", newRecipeArray);
    //   newMenuObj[day] = newRecipeArray;
    //   console.log("newMenuObj🌝🌝🌝🌝🌝", newMenuObj);
    // }
    // const renderObj = newMenuObj;
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

  const openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(`このURLは開けません: ${url}`);
        }
      })
      .catch((error) => console.log("urlエラー", error));
  };

  // 選択した献立の削除 → 献立リスト一覧の取得
  const handleRemoveMenu = async (menuId) => {
    await deleteMenuAPI(menuId);
    //promiseAllチェレンジ
    allGetMenu();
    // setAllGetMenuFlag((prev) => !prev);
    // await navigation.navigate("献立リスト");
  };

  console.log("menu⭐⭐", menu);

  return (
    <View style={{ height: 600 }}>
      <Agenda
        //日付を押したらeditmenuに遷移
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
          navigation.navigate("献立登録");
        }}
        items={menu}
        renderItem={(item, firstItemInDay) => (
          <View style={styles.box}>
            <View style={styles.cornerBox}>
              <Text>{item.category}</Text>
            </View>
            <View style={styles.moziBox}>
              <Text style={styles.text}>{item.recipeName}</Text>
              <Text style={styles.text}>{`${item.serving}人前`}</Text>
              <AntDesign
                name="link"
                size={24}
                color="black"
                onPress={() => {
                  openURL(item.url);
                }}
              />
              <Feather
                name="trash-2"
                size={24}
                color="black"
                onPress={() => handleRemoveMenu(item.menuId)}
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("献立から買い物リストへ追加");
        }}
      >
        <Text style={styles.buttonInner}>献立から買い物リストへ追加</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
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
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 33,
  },
  cornerBox: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 5,
    marginVertical: "20%",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "80%",
    marginLeft: "10%",
  },
  buttonInner: {
    fontSize: 20,
  },
});
