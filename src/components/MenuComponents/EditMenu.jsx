import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";

export const EditMenu = ({ navigation }) => {
  const { selectedDay, setSelectedDay, selectedMenu, setSelectedMenu } =
    useContext(ShareShopDataContext);
  const handleMenuSubmit = () => {
    const newSelectedMenu = {
      ...selectedMenu,
      [selectedDay]: selectedElement,
    };
    console.log("newselectedMenu", newSelectedMenu);
    setSelectedMenu(newSelectedMenu);
    navigation.navigate("献立リスト");
  };

  const categories = [
    { id: 1, categry1: "主食" },
    { id: 2, categry1: "主菜" },
    { id: 3, categry1: "副菜" },
    { id: 4, categry1: "汁物" },
    { id: 5, categry1: "その他" },
    // 他のカテゴリー...
  ];
  const elementsByCategory = {
    1: [
      {
        id: 1,
        categry1: "主食",
        recipe: "そば",
        url: "https://dig-zamas.com/",
      },
      {
        id: 2,
        categry1: "主食",
        recipe: "パスタ",
        url: "https://dig-zamas.com/",
      },
      {
        id: 3,
        categry1: "主食",
        recipe: "うどん",
        url: "https://dig-zamas.com/",
      },
      {
        id: 4,
        categry1: "主食",
        recipe: "お米",
        url: "https://dig-zamas.com/",
      },
      {
        id: 5,
        categry1: "主食",
        recipe: "混ぜ込みご飯",
        url: "https://dig-zamas.com/",
      },
      // カテゴリー1に属する要素...
    ],
    2: [
      {
        id: 1,
        categry1: "主菜",
        recipe: "ハンバーグ",
        url: "https://dig-zamas.com/",
      },
      {
        id: 2,
        categry1: "主菜",
        recipe: "コロッケ",
        url: "https://dig-zamas.com/",
      },
      // カテゴリー2に属する要素...
    ],
    3: [
      {
        id: 1,
        categry1: "副菜",
        recipe: "きんぴらごぼう",
        url: "https://dig-zamas.com/",
      },
      {
        id: 2,
        categry1: "副菜",
        recipe: "ポテサラ",
        url: "https://dig-zamas.com/",
      },
      // カテゴリー3に属する要素...
    ],
    4: [
      {
        id: 1,
        categry1: "汁物",
        recipe: "具だくさん味噌汁",
        url: "https://dig-zamas.com/",
      },
      {
        id: 2,
        categry1: "汁物",
        recipe: "トマトスープ",
        url: "https://dig-zamas.com/",
      },
      // カテゴリー4に属する要素...
    ],
    5: [
      {
        id: 1,
        categry1: "その他",
        recipe: "ぶどう",
        url: "https://dig-zamas.com/",
      },
      {
        id: 2,
        categry1: "その他",
        recipe: "牛乳",
        url: "https://dig-zamas.com/",
      },
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
      <Text>{item.categry1}</Text>
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
              <Text>{item.recipe}</Text>
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
        <Text>選択した料理（ 人前 ）</Text>
        <FlatList
          data={selectedElement}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text>{item.recipe}</Text>
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
          onPress={handleMenuSubmit}
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
