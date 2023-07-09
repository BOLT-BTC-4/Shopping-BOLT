import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { EditRecipeItem } from "./EditRecipeItem";
// import { EditItem } from "./EditItem";

export const RecipeItemList = ({
  item,
  handleUpdateRecipeItem,
  handleRemoveRecipeItem,
  setModalEditRecipeItemVisible,
  recipeItems,
  setRecipeItems,
  // handleRemoveRecipeItem,
}) => {
  // //モーダルのuseState
  // const [modalEditRecipeItemVisible, setModalEditRecipeItemVisible] =
  //   useState(false);

  return (
    <View style={styles.listContainer}>
      <View style={styles.recipeItemNameBox}>
        <Text style={styles.defaultText}>{item.recipeItemName}</Text>
      </View>
      <View style={styles.recipeQuantityUnitBox}>
        <View style={styles.recipeQuantityBox}>
          <Text style={styles.rightText}>{item.quantity}</Text>
        </View>
        <View style={styles.recipeUnitBox}>
          <Text style={styles.default}>{item.unit}</Text>
        </View>
      </View>
      <View style={styles.iconBox}>
        <Feather
          name="edit"
          size={24}
          color="black"
          onPress={() => handleUpdateRecipeItem(item.id)}
        />
        <Feather
          name="trash-2"
          size={24}
          color="black"
          onPress={() => handleRemoveRecipeItem(item.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    textAlign: "left",
  },
  rightText: {
    fontSize: 16,
    textAlign: "right",
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
    paddingBottom: 4,
    justifyContent: "center",
    borderWidth: 1.5,
    borderBottomColor: "#b6c471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },

  recipeItemNameBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  recipeQuantityUnitBox: {
    width: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  recipeQuantityBox: {
    flex: 1,
    // justifyContent: "right",
  },
  recipeUnitBox: {
    paddingLeft: 8,
    width: 70,
  },

  iconBox: {
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // text: {
  //   fontSize: 16,
  // },
  // textSmall: {
  //   fontSize: 10,
  //   color: "mediumseagreen",
  // },
  // subText: {
  //   fontSize: 12,
  //   color: "red",
  // },
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
  stack: {},
});
