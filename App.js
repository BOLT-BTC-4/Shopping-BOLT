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
import { Main } from "./src/screen/Main";
import { Menu } from "./src/screen/Menu";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MenuScreen } from "./src/screen/MenuScreen";
import { RecipeScreen } from "./src/screen/RecipeScreen";
import { MainScreen } from "./src/screen/MainScreen";
import { ShopScreen } from "./src/screen/ShopScreen";

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
      <Tab.Navigator initialRouteName="買物">
        <Tab.Screen name="献立" component={MenuStack} />
        <Tab.Screen name="レシピ" component={RecipeStack} />
        <Tab.Screen name="買物" component={MainStack} />
        <Tab.Screen name="お店" component={ShopStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
// export default App;
// <Stack.Navigator initialRouteName="ShopScreen">
// <SafeAreaView style={styles.container}>
//   <View style={styles.container}>
//     <TextInput
//       onChangeText={(value) => setInput("name", value)}
//       style={styles.input}
//       value={formState.name}
//       placeholder="Name"
//     />
//     <TextInput
//       onChangeText={(value) => setInput("description", value)}
//       style={styles.input}
//       value={formState.description}
//       placeholder="Description"
//     />
//     <Pressable onPress={addTodo} style={styles.buttonContainer}>
//       <Text style={styles.buttonText}>Create todo</Text>
//     </Pressable>
//     {todos.map((todo, index) => (
//       <View key={todo.id ? todo.id : index} style={styles.todo}>
//         <Text style={styles.todoName}>{todo.name}</Text>
//         <Text style={styles.todoDescription}>{todo.description}</Text>
//       </View>
//     ))}
//   </View>
// </SafeAreaView>

// const styles = StyleSheet.create({
//   container: { width: 400, flex: 1, padding: 20, alignSelf: "center" },
//   todo: { marginBottom: 15 },
//   input: {
//     backgroundColor: "#ddd",
//     marginBottom: 10,
//     padding: 8,
//     fontSize: 18,
//   },
//   todoName: { fontSize: 20, fontWeight: "bold" },
//   buttonContainer: {
//     alignSelf: "center",
//     backgroundColor: "black",
//     paddingHorizontal: 8,
//   },
//   buttonText: { color: "white", padding: 16, fontSize: 18 },
// });

// const initialState = { name: "", desrcription: "" };
// const [formState, setFormState] = useState(initialState);
// const [todos, setTodos] = useState([]);

// useEffect(() => {
//   fetchTodos();
// }, []);

// function setInput(key, value) {
//   setFormState({ ...formState, [key]: value });
// }

// async function fetchTodos() {
//   try {
//     const todoData = await API.graphql(graphqlOperation(listTodos));
//     const todos = todoData.data.listTodos.items;
//     setTodos(todos);
//   } catch (err) {
//     console.log("error fetching todos");
//   }
// }

// async function addTodo() {
//   try {
//     if (!formState.name || !formState.description) return;
//     const todo = { ...formState };
//     setTodos([...todos, todo]);
//     setFormState(initialState);
//     await API.graphql(graphqlOperation(createTodo, { input: todo }));
//   } catch (err) {
//     console.log("error creating todo:", err);
//   }
// }
