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
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.moziBox}>
          {/* <View> */}
          <Text style={styles.text}>{item.recipeItemName}</Text>
          {/* </View> */}
          {/* <View> */}
          <Text style={styles.text}>{item.quantity}</Text>
          {/* </View> */}
        </View>

        <View style={styles.iconBox}>
          <Text style={styles.text}>{item.unit}</Text>
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

        {/* item編集モーダル */}
        {/* <Modal
                    visible={modalEditItemVisible}
                    animationType="none"
                    transparent={true}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContents}>
                        <EditItem
                          items={items}
                          setItems={setItems}
                          setAddFlag={setAddFlag}
                          item={item}
                          setModalEditItemVisible={setModalEditItemVisible}
                        />
                      </View>
                    </View>
                  </Modal> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0d4", //買い物リストの背景色
    padding: 5,
    // justifyContent: "center",
    // alignContent: "center",
  },
  box: {
    height: 50,
    width: "100%",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // marginTop: 33,
  },
  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
  subText: {
    fontSize: 12,
    color: "red",
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
  stack: {},
});
