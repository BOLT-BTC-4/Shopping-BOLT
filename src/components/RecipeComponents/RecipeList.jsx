import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, Button, Alert, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";


export const RecipeList = ({ item, recipeName, handleRemoveItem, navigation }) => {
  console.log("===== comp_RecipeList =====");


  // Like★★★イメージを作成
  const likeImage = (like) => {
    if (like === 1) {
      return (
        <>
          <AntDesign name="star" size={10} color="blue" />
          <AntDesign name="staro" size={10} color="blue" />
          <AntDesign name="staro" size={10} color="blue" />
        </>
      )
    }
    else if (like === 2) {
      return (
        <>
          <AntDesign name="star" size={10} color="blue" />
          <AntDesign name="star" size={10} color="blue" />
          <AntDesign name="staro" size={10} color="blue" />
        </>
      )
    }
    else if (like === 3) {
      return (
        <>
          <AntDesign name="staro" size={10} color="blue" />
          <AntDesign name="staro" size={10} color="blue" />
          <AntDesign name="staro" size={10} color="blue" />
        </>
      )
    }
    else {
      return (
        <>
          <AntDesign name="star" size={10} color="blue" />
          <AntDesign name="star" size={10} color="blue" />
          <AntDesign name="star" size={10} color="blue" />
        </>
      )
    }
  };

  // レシピURLを開く
  const openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(`このURLは開けません: ${url}`);
        }
      })
      .catch((error) => console.log("urlエラー", error));
  };

  // レンダリング///////////////////////////////////////////////////////////
  return (
    <>

      <View style={styles.box}>
        <View style={styles.moziBox}>
          <View style={styles.stack}>
            <Text style={styles.textSmall}>{item.category}</Text>
            <Text style={styles.textSmall}>{likeImage(item.like)}</Text>
            <Text style={styles.text}>{recipeName}</Text>
          </View>
          <AntDesign
            name="link"
            size={24}
            color="black"
            onPress={() => {
              openURL(item.url);
            }}
          />
        </View>
        <View style={styles.iconBox}>
          <Feather
            name="edit"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("レシピ登録/編集", { item });
            }}
          />
          <Feather
            name="trash-2"
            size={24}
            color="black"
            onPress={() => handleRemoveItem(item.id)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  check: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textDecorationLine: "line-through",
  },

  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  cornerBox: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },

  textSmall: {
    fontSize: 10,
    color: "mediumseagreen",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContents: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

