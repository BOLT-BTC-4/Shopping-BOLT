import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity
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
import { FontAwesome } from "@expo/vector-icons";

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
import { AddRecipe } from "./src/components/RecipeComponents/AddRecipe";
import { AddRecipeItem } from "./src/components/RecipeComponents/AddRecipeItem";
import { AddAiRecipe } from "./src/components/RecipeComponents/AIRecipe/AddAiRecipe";
import { EditRecipe } from "./src/components/RecipeComponents/EditRecipe";
import { ReferenceRecipe } from "./src/components/RecipeComponents/ReferenceRecipe";

import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { copyItemPresetAPI } from "./src/boltAPI";

import {
  Authenticator,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = ({ title }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <Text style={{ color: "#B6C471", fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>{title}</Text>
    <Image
      style={{ height: 40, width: 40, marginRight: 60 }}
      source={require('./assets/logo.png')}
      resizeMode="contain"
    />
  </View>
);

// 各タブ内のコンポーネントをまとめる
const MenuStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle title="献立リスト" />,
        headerStyle: { backgroundColor: "#FFF0D4" },
      }}
    >
      <Stack.Screen name="献立リスト" component={MenuScreen} />
      <Stack.Screen name="献立登録" component={EditMenu} />
      <Stack.Screen name="献立から買い物リストへ追加" component={AddMenu} />
      <Stack.Screen name="買い物リスト" component={MainScreen} />
    </Stack.Navigator>
  );
};

const RecipeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle title="レシピリスト" />,
        headerStyle: { backgroundColor: "#FFF0D4" },
      }}
    >
      <Stack.Screen name="レシピリスト" component={RecipeScreen} />
      <Stack.Screen name="レシピ登録" component={AddRecipe} />
      <Stack.Screen name="レシピアイテム登録" component={AddRecipeItem} />
      <Stack.Screen name="レシピ編集" component={EditRecipe} />
      <Stack.Screen name="AI'sレシピ" component={AddAiRecipe} />
      <Stack.Screen name="レシピ詳細" component={ReferenceRecipe} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle title="買い物リスト" />,
        headerStyle: { backgroundColor: "#FFF0D4" },
      }}
    >
      <Stack.Screen name="買い物リスト" component={MainScreen} />
    </Stack.Navigator>
  );
};

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle title="お店リスト" />,
        headerStyle: { backgroundColor: "#FFF0D4" },
      }}
    >
      <Stack.Screen name="お店リスト" component={ShopScreen} />
      <Stack.Screen name="リスト表示" component={ShopList} />
      <Stack.Screen name="新規登録" component={AddShop} />
      <Stack.Screen name="お店編集" component={EditShop} />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <LogoTitle title="設定変更" />,
        headerStyle: { backgroundColor: "#FFF0D4" },
      }}
    >
      <Stack.Screen name="設定変更" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const signInHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: fontSizes.xxl, padding: space.xl, color: "#B6C471" }}>
        Shopping BOLT
      </Text>
      <Image
        style={{ height: 40, width: 40 }}
        source={require('./assets/logo.png')}
      // resizeMode="contain"
      />
    </View>
  );
};

const App = () => {
  const {
    tokens: { colors },
  } = useTheme();

  return (
    <>
      <Authenticator.Provider>
        <Authenticator
          // will wrap every subcomponent
          Container={(props) => (
            // reuse default `Container` and apply custom background
            <Authenticator.Container
              {...props}
              style={{ backgroundColor: "#FFF0D4" }}
            />
          )}
          // will render on every subcomponent
          Header={signInHeader}
        >
          <ShareShopDataProvider>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="買物"
                screenOptions={() => ({
                  tabBarActiveTintColor: "#B45817",//アイコン用のアクティブカラー #007932
                  tabBarInactiveTintColor: "#f5f3f0",//アイコン用の非アクティブカラー
                  activeTintColor: "#B45817", // アイコンラベル用のアクティブカラー
                  inactiveTintColor: "#f5f3f0",// アイコンラベル用の非アクティブカラー
                  tabBarStyle: { backgroundColor: "#b6c471" }
                })}
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
        </Authenticator>
      </Authenticator.Provider>
    </>
  );
};

// export default withAuthenticator(App);
export default App;

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
