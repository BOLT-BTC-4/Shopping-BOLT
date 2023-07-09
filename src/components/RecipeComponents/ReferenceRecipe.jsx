import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { createRecipeAPI, fetchRecipeAPI } from "../../boltAPI";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const ReferenceRecipe = ({ navigation }) => {
  const {
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // useState、useContext
  const { updateRecipe, updateRecipeItem } = useContext(ShareShopDataContext);
  console.log("updateRecipe:", updateRecipe);
  console.log("updateRecipeItem:", updateRecipeItem);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.recipeTitle}>{updateRecipe.category}</Text>
        <View>
          <Text style={styles.recipeTitle}>{updateRecipe.recipeName}</Text>
          <Text style={styles.recipeLabel}>
            材料　＜{updateRecipe.serving}人前＞
          </Text>
          <View style={styles.recipeText}>
            {updateRecipeItem && updateRecipeItem.length > 0 ? (
              updateRecipeItem.map((item, index) => (
                <Text key={index}>
                  {item.recipeItemName}：{item.quantity}
                  {item.unit}
                </Text>
              ))
            ) : (
              <Text>No items found.</Text>
            )}
          </View>
          <Text style={styles.recipeLabel}>作り方</Text>
          <View style={styles.recipeText}>
            {updateRecipe.memo &&
              updateRecipe.memo
                .split("\n")
                .map((line, index) => <Text key={index}>{line}</Text>)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0d4", //買い物リストの背景色
    padding: 10,
  },

  inputContainer: {
    // flex: 1,
  },
  loadingMsgBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  defaultText: {
    fontSize: 16,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  inputArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown1BtnStyle: {
    width: "49%",
    height: 35,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 16,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    marginLeft: 18,
    color: "#444",
    textAlign: "left",
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 8,
    backgroundColor: "#b6c471",
    padding: 8,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleArea: {
    padding: 8,
    backgroundColor: "#B45817",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    marginBottom: 4,
  },
  recipeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 0,
  },
  recipeText: {
    marginTop: 4,
    marginLeft: 24,
  },
  underBar: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
