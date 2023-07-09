import React, { createContext, useState, useEffect } from "react";
import { table } from "../../table";
import {
  createShopAPI,
  fetchShopAPI,
  copyItemPresetAPI,
  fetchShoppingListAPI,
} from "../boltAPI";
import moment from "moment";

export const ShareShopDataContext = createContext();

export const ShareShopDataProvider = ({ children }) => {
  console.log("===== comp_ShareShopDataContext =====");

  // お店の一覧を取得
  const getAllShop = async () => {
    const initShopData = await fetchShopAPI();
    //ドロップダウンで利用できるようにオブジェクトキー変更
    const getArrayDropDownList = initShopData.map((item) => {
      return { key: item.id, value: item.shopName, corner: item.corner };
    });
    setShopData(initShopData);
    setShopDataDrop(getArrayDropDownList);
  };

  // 買い物リスト一覧の取得
  const getAllShoppingList = async () => {
    const shoppingListData = await fetchShoppingListAPI();
    setItems(shoppingListData);
  };

  const [shopData, setShopData] = useState([]);
  const [shopDataDrop, setShopDataDrop] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [newShopButton, setNewShopButton] = useState(true);
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [menu, setMenu] = useState({});
  const [addFlag, setAddFlag] = useState(false);
  const [items, setItems] = useState([]);
  //デフォルトで何人前かの状態変数
  const [defaultServing, setDefaultServing] = useState(4);
  // レシピ一覧データ
  const [recipeData, setRecipeData] = useState([]);
  const [updateRecipeItem, setUpdateRecipeItem] = useState([]);
  const [updateRecipe, setUpdateRecipe] = useState({});
  //全てのmenuを取得する関数を実行させるための変数
  const [allGetMenuFlag, setAllGetMenuFlag] = useState(false);
  //全てのitemを取得する関数を実行させるための変数
  const [allGetItemFlag, setAllGetItemFlag] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("全て");

  useEffect(() => {
    // getAllShop();
    // getAllShoppingList();
  }, []);
  return (
    <ShareShopDataContext.Provider
      value={{
        shopData,
        setShopData,
        shopDataDrop,
        setShopDataDrop,
        selectedValue,
        setSelectedValue,
        newShopButton,
        setNewShopButton,
        selectedDay,
        setSelectedDay,
        menu,
        setMenu,
        addFlag,
        setAddFlag,
        items,
        setItems,
        defaultServing,
        setDefaultServing,
        recipeData,
        setRecipeData,
        updateRecipeItem,
        setUpdateRecipeItem,
        updateRecipe,
        setUpdateRecipe,
        allGetMenuFlag,
        setAllGetMenuFlag,
        allGetItemFlag,
        setAllGetItemFlag,
        displayedRecipes,
        setDisplayedRecipes,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ShareShopDataContext.Provider>
  );
};
