import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export const EditMenu = () => {
  const categories = [
    { id: 1, name: "主食" },
    { id: 2, name: "主菜" },
    { id: 3, name: "副菜" },
    { id: 4, name: "汁物" },
    { id: 5, name: "その他" },
    // 他のカテゴリー...
  ];

  const elementsByCategory = {
    1: [
      { id: 1, name: "そば" },
      { id: 2, name: "パスタ" },
      { id: 3, name: "うどん" },
      { id: 4, name: "お米" },
      { id: 5, name: "混ぜ込みご飯" },
      // カテゴリー1に属する要素...
    ],
    2: [
      { id: 1, name: "ハンバーグ" },
      { id: 2, name: "コロッケ" },
      // カテゴリー2に属する要素...
    ],
    3: [
      { id: 1, name: "きんぴらごぼう" },
      { id: 2, name: "ポテサラ" },
      // カテゴリー3に属する要素...
    ],
    4: [
      { id: 1, name: "具だくさん味噌汁" },
      { id: 2, name: "トマトスープ" },
      // カテゴリー4に属する要素...
    ],
    5: [
      { id: 1, name: "ぶどう" },
      { id: 2, name: "牛乳" },
      // カテゴリー5に属する要素...
    ],
    // 他のカテゴリーに属する要素...
  };
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setDisplayedElements(elementsByCategory[categoryId]);
  };

  const [selectedElement, setSelectedElement] = useState([]);
  const handleElementSelect = (element) => {
    setSelectedElement((recipes) => [...recipes, element]);
    // console.log("////", selectedElement);
    // 要素をレシピ表示配列から削除する
    setDisplayedElements((prevElements) =>
      prevElements.filter((item) => item.id !== element.id)
    );
  };
  const [displayedElements, setDisplayedElements] = useState(
    elementsByCategory[selectedCategory]
  );
  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={selectedCategory === item.id ? styles.activeTab : styles.tab}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  //recipe表示
  const renderElements = () => {
    // const elements = elementsByCategory[selectedCategory];
    return (
      <FlatGrid
        itemDimension={100} // 要素の幅
        data={displayedElements} // 表示される配列を使用する
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleElementSelect(item)}>
            <View style={styles.elementContainer}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  //選択された料理表示
  const renderSelectedElement = () => {
    if (!selectedElement) {
      return null;
    }
    return (
      <View style={styles.selectedElementContainer}>
        <Text>選択した料理</Text>
        <FlatList
          data={selectedElement}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text>{item.name}</Text>
              <AntDesign name="minuscircleo" size={24} color="black" />
              <Text>4</Text>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatGrid
        data={categories}
        renderItem={renderCategoryTab}
        keyExtractor={(item) => item.id.toString()}
        itemDimension={60} // 要素の幅
      />
      {renderElements()}
      {renderSelectedElement()}

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="こんだてを登録"
          // onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  tab: {
    padding: 10,
    // width: "0%",
  },
  activeTab: {
    padding: 10,
    backgroundColor: "lightblue",
  },
  elementContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 10,
    height: 50,
  },
  selectedElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 10,
    height: 300,
    width: "100%",
  },
  box: {
    height: 30,
    width: "80%",
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 33,
  },
  button: {
    marginTop: 1,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "50%",
    marginLeft: "25%",
  },
};
