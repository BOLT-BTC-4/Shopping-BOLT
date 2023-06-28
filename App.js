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
// import { API, graphqlOperation } from "aws-amplify";
// import { createTodo } from "./src/graphql/mutations";
// import { listTodos } from "./src/graphql/queries";
// import { Amplify } from "aws-amplify";
// import awsExports from "./src/aws-exports";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MenuScreen } from "./src/screen/MenuScreen";
import { RecipeScreen } from "./src/screen/RecipeScreen";
import { MainScreen } from "./src/screen/MainScreen";
import { ShopScreen } from "./src/screen/ShopScreen";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// Amplify.configure(awsExports);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="献立リスト" component={MenuScreen} />
    </Stack.Navigator>
  );
};

const RecipeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="レシピリスト" component={RecipeScreen} />
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
      <Stack.Screen name="お店リスト" component={ShopScreen} />
    </Stack.Navigator>
  );
};




export default App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="買物"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="献立"
          component={MenuStack}
          options={{
            tabBarLabel: '献立',
            tabBarIcon: ({ color }) => (
              <AntDesign name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="レシピ"
          component={RecipeStack}
          options={{
            tabBarLabel: 'レシピ',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="utensils" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="買物"
          component={MainStack}
          options={{
            tabBarLabel: '買物',
            tabBarIcon: ({ color }) => (
              <AntDesign name="shoppingcart" color={color} size={26} />
            ),
          }} />
        <Tab.Screen
          name="お店"
          component={ShopStack}
          options={{
            tabBarLabel: 'お店',
            tabBarIcon: ({ color }) => (
              <Entypo name="shop" color={color} size={26} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
