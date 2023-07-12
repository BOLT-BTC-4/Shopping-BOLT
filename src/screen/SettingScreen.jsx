import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { dataClearAPI, fetchShopAPI, fetchShoppingListAPI } from "../boltAPI";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { ShareShopDataContext } from "./ShareShopDataContext";
// import { TouchableOpacity } from "react-native-web";

export const SettingScreen = ({ navigation }) => {
  //アイテムリスト
  const { items, setItems, allGetItemFlag, setAllGetItemFlag } =
    useContext(ShareShopDataContext);

  //商品追加用flag
  const { addFlag, setAddFlag } = useContext(ShareShopDataContext);

  // Shop関連のuseState
  // 買物/お店タブで利用するため2つともContext化
  const { selectedValue, setSelectedValue } = useContext(ShareShopDataContext);

  // shopタブでも利用するため下記のshopDataに名称変更
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  const { shopDataDrop, setShopDataDrop } = useContext(ShareShopDataContext);

  useEffect(() => {
    // // 買い物リスト一覧の取得
    const getAllShoppingList = async () => {
      const shoppingListData = await fetchShoppingListAPI();
      // console.log("------shoppingListData----47----::", shoppingListData);
      setItems(shoppingListData);
    };
    // navigation.navigate("買い物リスト");
    //////////////////////////////////////////////////////////////////////////UseEffect!API🔴
    getAllShoppingList();
  }, [allGetItemFlag]);

  useEffect(() => {
    // お店の一覧を取得
    const getAllShop = async () => {
      const initShopData = await fetchShopAPI();
      //ドロップダウンで利用できるようにオブジェクトキー変更
      const getArrayDropDownList = initShopData.map((item) => {
        return { key: item.id, value: item.shopName, corner: item.corner };
      });
      console.log("------shoppingListData----64----::", getArrayDropDownList);
      setShopData(initShopData);
      setShopDataDrop(getArrayDropDownList);
    };
    getAllShop();
  }, []);

  useEffect(() => {
    const transferTab = () => {
      navigation.navigate("買物");
    };
    Alert.alert(
      "ようこそShopping BOLTへ!!",
      "接続確認をします。\n5秒お待ち下さい。\n確認後、買物タブへ移動します。"
    );
    setTimeout(() => {
      transferTab();
    }, 5000);
  }, []);

  //  useAuthenticator'から'user'の現在の値のみを取り出す。
  const userSelector = (context) => [context.user];

  const SignOutButton = () => {
    const { user } = useAuthenticator(userSelector);
    // サインアウトしたら、ローカルのデータをクリアする
    async function signOutOriginal() {
      try {
        await dataClearAPI(); // サインアウトしたら、ローカルのデータをクリアする
        await Auth.signOut();
        console.log("===サインアウト完了===");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>ようこそ! {user.username} さん</Text>
        {/* <Text style={styles.h1}>ようこそShopping BOLTへ</Text> */}
        <View style={styles.headerBox}>
          <Text style={styles.h2}>【各タブの説明】</Text>
        </View>
        <Text style={styles.h3Title}>《献立タブ》</Text>
        <Text style={styles.h3}>献立の登録、閲覧、編集ができます。</Text>
        <Text style={styles.h3Title}>《レシピタブ》</Text>
        <Text style={styles.h3}>
          レシピの登録、閲覧、編集、AIレシピ提案ができます。
        </Text>
        <Text style={styles.h3Title}>《買物タブ》</Text>
        <Text style={styles.h3}>
          買物リストのソート、追加、編集ができます。
        </Text>
        <Text style={styles.h3Title}>《お店タブ》</Text>
        <Text style={styles.h3}>お店の登録、編集ができます。</Text>
        <View style={styles.signOutBox}>
          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={signOutOriginal}
          >
            <Text style={styles.buttonInner}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SignOutButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0D4",
    padding: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  signOutBox: {
    // height: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBox: {
    height: 60,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // //Sign out
    // justifyContent: "center",
    // alignItems: "center",
    // // fontcolor: "#F5F3F0",
    // height: 40,
    backgroundColor: "#B6C471",

    borderRadius: 20,
    // width: 120,
  },
  buttonTouch: {
    //Sign out
    justifyContent: "center",
    alignItems: "center",
    // fontcolor: "#F5F3F0",
    height: 40,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    width: 120,
  },
  Text: {
    marginBottom: 8,
  },
  h1: {
    fontSize: 24,
    marginBottom: 16,
    marginTop: 8,
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
  },
  h2: {
    fontSize: 22,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  h3Title: {
    fontSize: 18,
    marginBottom: 3,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 10,
    fontWeight: "bold",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
  },
  // buttonInner: {
  //   // fontSize: 20,
  //   color: "white",
  // },
});
