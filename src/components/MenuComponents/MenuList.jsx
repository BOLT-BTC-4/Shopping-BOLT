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
  const getNewMenu = async (day) => {
    //(レンダリング用)
    const newRecipeArray = [];
    // 保存したmenuを取り出し;
    const fetchMenu = await fetchDateMenuAPI(day);
    //取得したmenuを回す
    fetchMenu.forEach(async (recipe) => {
      const getedRecipe = await fetchRecipeAndRecipeItemAPI(recipe.recipeID);
      const addArray = [];
      //取得したレシピのitemsをループ
      getedRecipe.items.forEach((item, index) => {
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
      // recipeObj用のobj(レンダリング用)
      const recipeObj = {
        id: getedRecipe.id,
        menuId: recipe.id,
        category: getedRecipe.category,
        recipeName: getedRecipe.recipeName,
        url: getedRecipe.url,
        serving: recipe.menuServing,
        like: getedRecipe.like,
        items: addArray,
      };
      newRecipeArray.push(recipeObj);
      console.log("getNewMenuの中⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐", newRecipeArray);
      setMenu(
        (prevMenu) => (prevMenu = { ...prevMenu, [day]: newRecipeArray })
      );
    });
  };

  const allGetMenu = async () => {
    // まず全てのmenuを取得
    const allGetMenu = await fetchMenuAPI();
    // 日付のみの配列に変形
    const filteredDate = Array.from(
      new Set(allGetMenu.map((menu) => menu.date))
    );
    console.log("filterDate:::::::::::", filteredDate);
    // 日付のみの配列を回して
    filteredDate.forEach(async (day) => {
      setTimeout(function () {
        getNewMenu(day);
      }, 50);
    });
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
    await navigation.navigate("献立リスト");
  };

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
