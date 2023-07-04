import { DataStore } from "@aws-amplify/datastore";
import "@azure/core-asynciterator-polyfill";
import {
  Shop,
  ShoppingList,
  Recipe,
  RecipeItem,
  Menu,
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
    console.log("APIお店の一覧取得");
    const shopList = await DataStore.query(Shop);
    return shopList
    // return JSON.stringify(shopList, null, 2);
  } catch (err) {
    throw err;
  }
};

// Shop お店の削除
export const deleteShopAPI = async (id) => {
  try {
    const deleteShop = await DataStore.query(Shop, id);
    DataStore.delete(Shop, deleteShop)

  } catch (err) {
    throw err;
  }
}


// ShoppingList 買い物登録
export const createShoppingListAPI = async (data) => {
  // API動作確認用ダミーデータ
  // data = {
  //   item: "豚肉",
  //   unit: "g",
  //   quantity: 800,
  //   corner: "肉",
  // };
  // ダミーここまで
  console.log(data);

  const { item, unit, quantity, corner } = data;
  try {
    await DataStore.save(
      new ShoppingList({
        item,
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

  const { recipeName, memo, url, serving, category, like, recipeItemList } = data;

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
      console.log("item:", recipeItemName, unit, quantity, corner)
      await DataStore.save(
        new RecipeItem({
          recipeItemName,
          unit,
          quantity,
          corner,
          recipeID: recipeMany.id,
        })
      );
    })

  } catch (error) {
    throw error;
  }
};



export const createMenuAPI = async (data) => {

  const { recipeName, memo, url, serving, category, like, recipeItemList } = data;

  try {
    // 次に, Menu を作成　(Recipt @manyToMany Manu)
    // API動作確認用ダミーデータ
    data = {
      date: "2023-06-28",
    };
    // ダミーここまで

    const { date } = data;
    const menu = await DataStore.save(
      new Menu({
        date,
      })
    );

    // 最後に Recipe と Menu のリンクモデルを作成
    await DataStore.save(
      new RecipeMenu({
        recipeName: recipeMany,
        menu: menu,
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
}

// recipe IDを指定してレシピの取得
export const fetchIdRecipeAPI = async (id) => {
  try {
    const recipe = await DataStore.query(Recipe, id);
    // const recipeItem = recipeList[0].RecipeItems.values.then(item => item = JSON.stringify(item, null, 2))
    return JSON.stringify(recipe, null, 2);
  } catch (err) {
    throw err;
  }
}

// recipeItem recipeIdを指定してレシピ材料の取得
export const fetchIdRecipeItemAPI = async (id) => {
  try {
    const recipeItem = await DataStore.query(RecipeItem, r => r.recipeID.eq(id));
    console.log(recipeItem)
    return JSON.stringify(recipeItem, null, 2);
  } catch (err) {
    throw err;
  }
}

// レシピの削除
export const deleteRecipeAPI = async (id) => {
  try {
    const deleterecipe = await DataStore.query(Recipe, id);
    DataStore.delete(Recipe, deleterecipe)

  } catch (err) {
    throw err;
  }
}



// ログアウト時にローカルデータをクリアする
// ＊同じ端末で別ユーザーログイン時、ローカルデータを消さないと前のログインユーザーのデータが見えてしまう。
export const dataClearAPI = async () => {
  try {
    await DataStore.clear();

  } catch (err) {
    throw err;
  }
}
