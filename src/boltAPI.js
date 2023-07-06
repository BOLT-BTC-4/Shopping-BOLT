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
  console.log("///🔴 API利用 : createShopAPI ///");
  console.log("data:", data)
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
  console.log("///🔴 API利用 : fetchShopAPI ///");
  try {
    console.log("API:お店の一覧取得");
    const shopList = await DataStore.query(Shop);
    return shopList;
    // return JSON.stringify(shopList, null, 2);
  } catch (err) {
    throw err;
  }
};

// Shop　お店の修正
export const updateShopAPI = async (item) => {
  console.log("///🔴 API利用 : updateShopAPI ///");
  console.log("item:", item)

  try {
    const targetItem = await DataStore.query(Shop, item.id);
    await DataStore.save(
      Shop.copyOf(targetItem, (updated) => {
        updated.shopName = item.shopName;
        updated.corner = item.corner;
      })
    );
  } catch (err) {
    throw err;
  }
};

// Shop お店の削除
export const deleteShopAPI = async (id) => {
  console.log("///🔴 API利用 : fetchShopAPI ///");
  try {
    const deleteShop = await DataStore.query(Shop, id);
    DataStore.delete(Shop, deleteShop);
  } catch (err) {
    throw err;
  }
};

// ShoppingList 買い物登録
export const createShoppingListAPI = async (data) => {
  console.log("///🔴 API利用 : createShoppingListAPI ///");
  const {
    itemName,
    unit,
    quantity,
    corner,
    directions,
    check,
    bought,
    recipeName,
    recipeID,
  } = data;
  console.log("data", data);
  try {
    await DataStore.save(
      new ShoppingList({
        itemName,
        unit,
        quantity,
        corner,
        directions,
        check,
        bought,
        recipeName,
        recipeID,
      })
    );
  } catch (error) {
    throw error;
  }
};

// ShoppingList 買い物リストの取得（boughtがfalseのみ＝買ったよを押してない。）
export const fetchShoppingListAPI = async () => {
  console.log("///🔴 API利用 : fetchShoppingListAPI ///");
  try {
    const shoppingList = await DataStore.query(ShoppingList, (r) =>
      r.bought.eq(false)
    );
    console.log(
      "$$$$$$$$$$fetchShoppingListAPIのなか!!! shoppingList:",
      shoppingList
    );

    return shoppingList;
  } catch (err) {
    throw err;
  }
};

// ShoppingList 買い物リストの更新
export const updateShoppingListAPI = async (item) => {
  console.log("///🔴 API利用 : updateShoppingListAPI ///");
  try {
    const targetItem = await DataStore.query(ShoppingList, item.id);
    await DataStore.save(
      ShoppingList.copyOf(targetItem, (updated) => {
        updated.bought = item.bought;
        updated.check = item.check;
        updated.corner = item.corner;
        updated.directions = item.directions;
        updated.itemName = item.itemName;
        updated.quantity = Number(item.quantity);
        updated.unit = item.unit;
        updated.recipeName = item.recipeName;
      })
    );
  } catch (err) {
    throw err;
  }
};

// ShoppingList 買い物リストの削除
export const deleteShoppingListAPI = async (id) => {
  console.log("///🔴 API利用 : deleteShoppingListAPI ///");
  try {
    const deleteShoppingList = await DataStore.query(ShoppingList, id);
    DataStore.delete(ShoppingList, deleteShoppingList);
  } catch (err) {
    throw err;
  }
};

// Recipe(親) - RecipeItem(子) レシピ／レシピアイテムの登録
//献立リスト保存検証用
export const createRecipeAPI = async (data) => {
  console.log("///🔴 API利用 : createRecipeAPI ///");
  const { recipeName, memo, url, serving, category, like, recipeItemList } =
    data;

  try {
    // 最初に recipe を作成 w/recipeItem (@hasMany RecipeItem, @manyToMany Manu)
    const recipeMany = await DataStore.save(
      new Recipe({
        recipeName,
        memo,
        url,
        serving: Number(serving),
        category,
        like: Number(like),
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
          quantity: Number(quantity),
          corner,
          recipeID: recipeMany.id,
        })
      );
    });
  } catch (error) {
    throw error;
  }
};

// Recipe(親) - RecipeItem(子) レシピ／レシピアイテムの更新
export const updateRecipeAPI = async (item) => {
  console.log("///🔴 API利用 : boltAPI_updateRecipeAPI-item", item);
  console.log("///🤩 API利用 : updateRecipeAPI ///");
  const {
    recipeID,
    recipeName,
    memo,
    url,
    serving,
    category,
    like,
    recipeItemList,
  } = item;
  console.log("///🤩 API利用 : recipeID ///", recipeID);
  try {
    // // recipeItem削除
    await DataStore.delete(RecipeItem, (c) => c.recipeID.eq(recipeID));

    // recipe更新
    const targetItem = await DataStore.query(Recipe, recipeID);
    console.log("targetItem:", targetItem);
    await DataStore.save(
      Recipe.copyOf(targetItem, (updated) => {
        updated.recipeName = recipeName;
        updated.memo = memo;
        updated.url = url;
        updated.serving = Number(serving);
        updated.category = category;
        updated.like = Number(like);
      })
    );

    // recipeItem再作成
    recipeItemList.forEach(async (item) => {
      // console.log("item:", item)
      const { recipeItemName, unit, quantity, corner } = item;
      console.log("RecipeItem:", recipeItemName, unit, quantity, corner);
      await DataStore.save(
        new RecipeItem({
          recipeItemName,
          unit,
          quantity: Number(quantity),
          corner,
          recipeID: recipeID,
        })
      );
    });
  } catch (err) {
    throw err;
  }
};

//Menu 献立登録
export const createMenuAPI = async (data) => {
  console.log("///🔴 API利用 : createMenuAPI///");
  console.log("$$$$$$$$$$$$APIのなか⭐⭐", data);
  // // API動作確認用ダミーデータ
  // data = {
  //   date: "2023-07-12",
  //   recipeID: "ddddddd",
  //   menuServing: 3,
  // };
  // // ダミーここまで

  const { date, recipeID, menuServing } = data;
  try {
    const menu = await DataStore.save(
      new Menu({
        date,
        recipeID,
        menuServing: Number(menuServing),
      })
    );
  } catch (error) {
    throw error;
  }
};

// // Menu 献立の削除（案1）※awsドキュメントベース　https://docs.amplify.aws/lib/datastore/data-access/q/platform/react-native/#create-and-update:~:text=copy-,Delete,-To%20delete%20an
export const deleteMenuAPI = async (menuId) => {
  // const { item.id, item.date } = data;
  console.log("🤩menuId2: 🤩", menuId, typeof menuId);

  try {
    const deleteMenuId = await DataStore.query(Menu, menuId);
    console.log("🤩deleteMenuId: 🤩", deleteMenuId);
    await DataStore.delete(deleteMenuId);
  } catch (err) {
    console.log("err: 🤩", deleteMenuId);
    throw err;
  }
};

// export const deleteMenuAPI = async (date1, id) => {
//   // const { item.id, item.date } = data;
//   console.log("🤩date&id2: 🤩", date1, id, typeof id);

//   try {
//     // const deleteMenuId = await DataStore.query(Menu, (c) =>
//     //   c.recipeID.eq(id).date.eq(date1)
//     // );
//     const deleteMenuId = await DataStore.query(Menu, (c) =>
//       c.and((c) => [c.recipeID.eq(id), c.date.eq(date1)])
//     );

//     console.log("🤩deleteMenuId: 🤩", deleteMenuId);
//     await DataStore.delete(deleteMenuId[0]); //第1引数にMenuがいるかも
//   } catch (err) {
//     console.log("err: 🤩", deleteMenuId);
//     throw err;
//   }
// };

// export const deleteMenuAPI = async (date, id) => {
//   // const { item.id, item.date } = data;
//   console.log("🤩date&id: 🤩", date, id);
//   try {
//     // 削除するMenuをid塊で取得
//     const deleteMenuId = await DataStore.query(Menu, (c) => c.recipeID.eq(id));
//     console.log("🤩deleteMenuId: 🤩", date, id);
//     // 削除するMenuを更にdateで特定し取得
//     const deleteMenuIdData = await DataStore.query(deleteMenuId, (d) =>
//       d.date.eq(date)
//     );
//     // 削除処理の実行
//     await DataStore.delete(Menu, deleteMenuIdData); //第1引数にMenuがいるかも
//   } catch (err) {
//     throw err;
//   }
// };

// // Menu 献立の削除（案2）※awsドキュメントｘ綾乃さん書式
// export const deleteMenuAPI = async (date, id) => {
//   // const { recipeID, date } = data;
//   console.log("🤩date&id: 🤩", date, id);
//   try {
//     // 削除するMenuをid塊で取得
//     const deleteMenu = await DataStore.query(Menu, (c) =>
//       c.and((c) => [c.recipeID.eq(id), c.date.eq(date)])
//     );
//     // //書き方違い　※https://blog.dreamhanks.com/第12回
//     // const deleteMenu = await DataStore.query(Menu, c =>
//     //   c.recipeID("eq", recipeID).date("eq", date)
//     // );

//     // 削除処理の実行
//     DataStore.delete(Menu, deleteMenu); //第１引数のMenuはいらないかも
//   } catch (err) {
//     throw err;
//   }
// };

// Recipe IDからレシピとレシピ材料の取得
export const fetchRecipeAndRecipeItemAPI = async (id) => {
  console.log("///🔴 API利用 : 　fetchRecipeAndRecipeItemAPI ///");
  try {
    const recipe = await DataStore.query(Recipe, id);
    const recipeItem = await DataStore.query(RecipeItem, (r) =>
      r.recipeID.eq(recipe.id)
    );
    return {
      id: recipe.id,
      recipeName: recipe.recipeName,
      memo: recipe.memo,
      category: recipe.category,
      url: recipe.url,
      serving: recipe.serving,
      like: recipe.like,
      items: recipeItem,
    };
  } catch (err) {
    throw err;
  }
};

// recipe レシピ一覧の取得
export const fetchRecipeAPI = async () => {
  console.log("///🔴 API利用 : fetchRecipeAPI  ///");
  try {
    const recipeList = await DataStore.query(Recipe);
    return recipeList;
  } catch (err) {
    throw err;
  }
};

// recipe IDを指定してレシピの取得
export const fetchIdRecipeAPI = async (id) => {
  console.log("///🔴 API利用 : fetchIdRecipeAPI ///");
  try {
    const recipe = await DataStore.query(Recipe, id);
    // const recipeItem = recipeList[0].RecipeItems.values.then(item => item = JSON.stringify(item, null, 2))
    return recipe;
  } catch (err) {
    throw err;
  }
};

// recipeItem recipeIdを指定してレシピ材料の取得
export const fetchIdRecipeItemAPI = async (id) => {
  console.log("///🔴 API利用 : fetchIdRecipeItemAPI ///");
  try {
    const recipeItem = await DataStore.query(RecipeItem, (r) =>
      r.recipeID.eq(id)
    );
    return recipeItem;
  } catch (err) {
    throw err;
  }
};

// Recipe レシピの削除
export const deleteRecipeAPI = async (id) => {
  console.log("///🔴 API利用 : deleteRecipeAPI///");
  try {
    const deleterecipe = await DataStore.query(Recipe, id);
    DataStore.delete(Recipe, deleterecipe);
  } catch (err) {
    throw err;
  }
};

// Item アイテムの登録
export const createItemAPI = async (data) => {
  console.log("///🔴 API利用 : createItemAPI ///");
  const { itemName, corner, unit } = data;
  try {
    await DataStore.save(
      new Item({
        itemName,
        corner,
        unit,
      })
    );
  } catch (error) {
    throw error;
  }
};

// Item　アイテム一覧の取得
export const fetchItemAPI = async () => {
  console.log("///🔴 API利用 : fetchItemAPI ///");
  try {
    const itemList = await DataStore.query(Item, (c) => c, {
      sort: (s) => s.createdAt("DESCENDING"),
    });
    return itemList;
  } catch (err) {
    throw err;
  }
};

// Itemリストが空だったら、itemPresetからコピー　使わない
// export const copyItemPresetAPI = async () => {
//   console.log("///🔴 API利用 : copyItemPresetAPI ///");
//   // Itemテーブルが空かどうかを確認する
//   const itemData = await DataStore.query(Item);
//   if (itemData.length === 0) {
//     // itemtemPresetテーブルからデータをコピーする
//     itemPresetData.forEach(async (itemPreset) => {
//       // Itemテーブルにデータを追加する
//       await DataStore.save(
//         new Item({
//           itemName: itemPreset.itemName,
//           unit: itemPreset.unit,
//           corner: itemPreset.corner,
//         })
//       );
//     });
//   }
// };

// ログアウト時にローカルデータをクリアする
// ＊同じ端末で別ユーザーログイン時、ローカルデータを消さないと前のログインユーザーのデータが見えてしまう。
export const dataClearAPI = async () => {
  console.log("///🔴 API利用 : dataClearAPI ///");
  try {
    await DataStore.clear();
  } catch (err) {
    throw err;
  }
};

// menu一覧の取得
export const fetchMenuAPI = async () => {
  console.log("///🔴 API利用 : fetchMenuAPI  ///");
  try {
    const recipeList = await DataStore.query(Menu);
    return recipeList;
  } catch (err) {
    throw err;
  }
};

// menu dateを指定してレシピの取得
export const fetchDateMenuAPI = async (date) => {
  console.log("///🔴 API利用 : fetchIdMenuAPI ///");
  try {
    const getMenu = await DataStore.query(Menu, (r) => r.date.eq(date));
    return getMenu;
  } catch (err) {
    throw err;
  }
};
