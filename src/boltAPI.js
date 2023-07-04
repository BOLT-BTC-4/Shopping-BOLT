import { DataStore } from "@aws-amplify/datastore";
import "@azure/core-asynciterator-polyfill";
import {
  Shop,
  ShoppingList,
  Menu,
  Item,
  ItemPreset,
  RecipeItem,
  Recipe,
  RecipeMenu,
} from "./models";

// Shop お店登録
export const createShopAPI = async (data) => {
  const { shopName, corner } = data;
  try {
    await DataStore.save(
      new Shop({
        shopName,
        corner,
      })
    );
  } catch (error) {
    throw error;
  }
};

// Shop　お店一覧の取得
export const fetchShopAPI = async () => {
  try {
    console.log("API:お店の一覧取得");
    const shopList = await DataStore.query(Shop);
    return shopList;
    // return JSON.stringify(shopList, null, 2);
  } catch (err) {
    throw err;
  }
};

// Shop お店の削除
export const deleteShopAPI = async (id) => {
  try {
    const deleteShop = await DataStore.query(Shop, id);
    DataStore.delete(Shop, deleteShop);
  } catch (err) {
    throw err;
  }
};

// ShoppingList 買い物登録
export const createShoppingListAPI = async (data) => {
  const { itemName, unit, quantity, corner } = data;
  try {
    await DataStore.save(
      new ShoppingList({
        itemName,
        unit,
        quantity,
        corner,
      })
    );
  } catch (error) {
    throw error;
  }
};

// Recipe(親) - RecipeItem(子) レシピ／レシピアイテムの登録
//献立リスト保存検証用
export const createRecipeAPI = async (data) => {
  const { recipeName, memo, url, serving, category, like, recipeItemList } =
    data;

  try {
    // 最初に recipe を作成 w/recipeItem (@hasMany RecipeItem, @manyToMany Manu)
    const recipeMany = await DataStore.save(
      new Recipe({
        recipeName,
        memo,
        url,
        serving,
        category,
        like,
      })
    );

    recipeItemList.forEach(async (item) => {
      // console.log("item:", item)
      const { recipeItemName, unit, quantity, corner } = item;
      console.log("item:", recipeItemName, unit, quantity, corner);
      await DataStore.save(
        new RecipeItem({
          recipeItemName,
          unit,
          quantity,
          corner,
          recipeID: recipeMany.id,
        })
      );
    });
  } catch (error) {
    throw error;
  }
};

//Menu 献立登録
export const createMenuAPI = async (data) => {
  // API動作確認用ダミーデータ
  data = {
    date: "2023-07-12",
  };
  // ダミーここまで

  const { date } = data;

  try {
    // const { date } = data;
    const menu = await DataStore.save(
      new Menu({
        date,
      })
    );

    // // ""menu" は Model と判明
    // console.log("menu: ", menu);
    // console.log("menu.id: ", menu.id);

    // API動作確認用ダミーデータ
    //     recipeID: "589047b2-7fcd-454f-9d7e-0fc1f5557fa1",
    //     // recipeName: "俺のカレー",

    const recipePosted = await DataStore.query(
      Recipe,
      "589047b2-7fcd-454f-9d7e-0fc1f5557fa1" //リレーション対象のレシピID
    );
    // console.log("recipePosted: ", recipePosted);

    // 次に Recipe と Menu のリンクモデルを作成
    await DataStore.save(
      new RecipeMenu({
        menu: menu,
        recipe: recipePosted,
      })
    );
  } catch (error) {
    throw error;
  }
};

// recipe レシピ一覧の取得
export const fetchRecipeAPI = async () => {
  try {
    const recipeList = await DataStore.query(Recipe);
    return recipeList;
  } catch (err) {
    throw err;
  }
};

// recipe IDを指定してレシピの取得
export const fetchIdRecipeAPI = async (id) => {
  try {
    const recipe = await DataStore.query(Recipe, id);
    // const recipeItem = recipeList[0].RecipeItems.values.then(item => item = JSON.stringify(item, null, 2))
    return JSON.stringify(recipe, null, 2);
  } catch (err) {
    throw err;
  }
};

// recipeItem recipeIdを指定してレシピ材料の取得
export const fetchIdRecipeItemAPI = async (id) => {
  try {
    const recipeItem = await DataStore.query(RecipeItem, (r) =>
      r.recipeID.eq(id)
    );
    console.log(recipeItem);
    return JSON.stringify(recipeItem, null, 2);
  } catch (err) {
    throw err;
  }
};

// レシピの削除
export const deleteRecipeAPI = async (id) => {
  try {
    const deleterecipe = await DataStore.query(Recipe, id);
    DataStore.delete(Recipe, deleterecipe);
  } catch (err) {
    throw err;
  }
};

// Item　アイテム一覧の取得
export const fetchItemAPI = async () => {
  try {
    const itemList = await DataStore.query(Item);
    return itemList;
  } catch (err) {
    throw err;
  }
};

// Itemリストが空だったら、ItemPresetからコピー
export const copyItemPresetAPI = async () => {
  // Step 1: Itemテーブルが空かどうかを確認する
  const itemData = await DataStore.query(Item);
  if (itemData.length === 0) {
    // Step 2: ItemPresetテーブルからデータをコピーする
    const itemPresetData = await DataStore.query(ItemPreset);
    console.log("⭐️", itemPresetData);
    await Promise.all(
      itemPresetData.map(async (itemPreset) => {
        // Itemテーブルにデータを追加する
        await DataStore.save(
          new Item({
            itemName: itemPreset.itemName,
            unit: itemPreset.unit,
            corner: itemPreset.corner,
          })
        );
      })
    );
  }
};

// ログアウト時にローカルデータをクリアする
// ＊同じ端末で別ユーザーログイン時、ローカルデータを消さないと前のログインユーザーのデータが見えてしまう。
export const dataClearAPI = async () => {
  try {
    await DataStore.clear();
  } catch (err) {
    throw err;
  }
};
