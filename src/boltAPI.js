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
  // API動作確認用ダミーデータ
  data = {
    recipe: "俺のカレー",
    memo: "香辛料で作るよ！（ルー不使用）",
    url: "https://dancyu.jp/recipe/2021_00004322.html",
    serving: 4,
    category1: "主菜",
    category2: "印",
    like: 3,
  };
  // ダミーここまで

  const { recipe, memo, url, serving, category1, category2, like } = data;

  try {
    // 最初に recipt を作成 w/reciptItem (@hasMany ReciptItem, @manyToMany Manu)
    const recipeMany = await DataStore.save(
      new Recipe({
        recipe,
        memo,
        url,
        serving,
        category1,
        category2,
        like,
        // Menus: [Menu] @manyToMany(relationName: "RecipeMenu"),
        // RecipeItems: [RecipeItem] @hasMany(indexName: "byRecipe", fields: ["id"])
      })
    );

    // API動作確認用ダミーデータ
    data = {
      recipeItem: "トマト",
      unit: "個",
      quantity: 2,
      corner: "野菜",
    };
    //   {
    //     recipeItem: "枝豆",
    //     // unit: "g",
    //     quantity: 100,
    //     corner: "野菜",
    //   },
    //   {
    //     recipeItem: "豚挽肉",
    //     // unit: "g",
    //     quantity: 200,
    //     corner: "肉",
    //   },
    // ];
    // ダミーここまで

    const { recipeItem, unit, quantity, corner } = data;

    await DataStore.save(
      new RecipeItem({
        recipeItem,
        unit,
        quantity,
        corner,
        recipeID: recipeMany.id,
      })
    );

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
        recipe: recipeMany,
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
