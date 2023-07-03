import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

import { ShareShopDataProvider } from "./src/screen/ShareShopDataContext";
import { MenuScreen } from "./src/screen/MenuScreen";
import { RecipeScreen } from "./src/screen/RecipeScreen";
import { MainScreen } from "./src/screen/MainScreen";
import { ShopScreen } from "./src/screen/ShopScreen";
import { SettingScreen } from "./src/screen/SettingScreen";

import { AddShop } from "./src/components/ShopComponents/AddShop";
import { ShopList } from "./src/components/ShopComponents/ShopList";
import { EditMenu } from "./src/components/MenuComponents/EditMenu";
import { EditShop } from "./src/components/ShopComponents/EditShop";
import { AddMenu } from "./src/components/MenuComponents/AddMenu";
import { EditRecipe } from "./src/components/RecipeComponents/EditRecipe";
import { AddRecipeItem } from "./src/components/RecipeComponents/AddRecipeItem";

import { withAuthenticator } from "@aws-amplify/ui-react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 各タブ内のコンポーネントをまとめる
const MenuStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="献立リスト" component={MenuScreen} />
      <Stack.Screen name="献立登録/編集" component={EditMenu} />
      <Stack.Screen name="献立から買い物リストへ追加" component={AddMenu} />
    </Stack.Navigator>
  );
};

const RecipeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="レシピリスト" component={RecipeScreen} />
      <Stack.Screen name="レシピ登録/編集" component={EditRecipe} />
      <Stack.Screen name="レシピアイテム登録/編集" component={AddRecipeItem} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="買い物リスト" component={MainScreen} />
    </Stack.Navigator>
  );
};

const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="お店リスト"
        component={ShopScreen}
      />
      <Stack.Screen
        name="リスト表示"
        component={ShopList}
      />
      <Stack.Screen
        name="新規登録"
        component={AddShop}
      />
      <Stack.Screen
        name="お店編集"
        component={EditShop}
      />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="設定" component={SettingScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <>
      <ShareShopDataProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="買物"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: "#694fad" }}
          >
            <Tab.Screen
              name="献立"
              component={MenuStack}
              options={{
                headerShown: false,
                tabBarLabel: "献立",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="calendar" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="レシピ"
              component={RecipeStack}
              options={{
                headerShown: false,
                tabBarLabel: "レシピ",
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="utensils" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="買物"
              component={MainStack}
              options={{
                headerShown: false,
                tabBarLabel: "買物",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="shoppingcart" color={color} size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="お店"
              component={ShopStack}
              options={{
                headerShown: false,
                tabBarLabel: "お店",
                tabBarIcon: ({ color }) => (
                  <Entypo name="shop" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="設定"
              component={SettingStack}
              options={{
                headerShown: false,
                tabBarLabel: "設定",
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="gear" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ShareShopDataProvider>
    </>
  );
};
export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: "center" },
  todo: { marginBottom: 15 },
  input: {
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "black",
    paddingHorizontal: 8,
  },
  buttonText: { color: "white", padding: 16, fontSize: 18 },
});
