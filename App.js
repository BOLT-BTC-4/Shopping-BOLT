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
import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./src/screen/Main";
// import { EditShop } from "./src/screen/EditShop";
import { SelectList } from "react-native-dropdown-select-list";

Amplify.configure(awsExports);

// const Stack = createNativeStackNavigator();

const App = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    setItems([
      {
        sales: "野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
      {
        sales: "野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
      {
        sales: "野菜",
        itemName: "玉ねぎ",
        quantity: 2,
        unit: "個",
        directions: 1,
        check: false,
      },
      {
        sales: "肉",
        itemName: "鶏肉",
        quantity: 300,
        unit: "g",
        directions: 3,
        check: false,
      },
    ]);
  };
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Main
            sales={item.sales}
            item={item.itemName}
            quantity={item.quantity}
            unit={item.unit}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Main" component={Main} />
    //     <Stack.Screen name="EditShop" component={EditShop} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignContent: "center",
  },
});
export default App;

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
