import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import { table } from "../../../table";
import uuid from "react-native-uuid";
import { createShoppingListAPI } from "../../boltAPI";

export const EditRecipeItem = ({
  recipeItems,
  setRecipeItems,
  setAddRecipeItemFlag,
  setModalEditRecipeItemVisible,
}) => {
  const { updateRecipeItem, setUpdateRecipeItem } =
    useContext(ShareShopDataContext);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  console.log("EditRecipeItem_updateRecipeItem", updateRecipeItem);

  const initializeForm = () => {
    setValue("recipeItemName", updateRecipeItem[0].recipeItemName);
    setValue("quantity", String(updateRecipeItem[0].quantity)); // TextInputが文字列しか参照できないため文字列型にしている
    setValue("unit", updateRecipeItem[0].unit);
  };

  const onSubmit = async (data) => {
    console.log("EditRecipe_onSubmit", data);
    const newRecipeItems = [...recipeItems];
    newRecipeItems.forEach((item) => {
      if (updateRecipeItem[0].id === item.id) {
        item.recipeItemName = data.recipeItemName;
        item.quantity = data.quantity;
        item.unit = data.unit;
      }
    });
    await setRecipeItems(newRecipeItems);
    setModalEditRecipeItemVisible(false);
    console.log("recipeItems:", recipeItems);
    console.log("更新完了");
  };

  useEffect(() => {
    initializeForm();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>食材</Text>
      {errors.itemName && (
        <Text style={styles.alertFont}>食材名を入力してください</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="recipeItemName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>量</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="quantity"
        rules={{ required: false }}
      />
      <Text style={styles.label}>単位</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="unit"
        rules={{ required: false }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="更新"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <Button
        color="#fff"
        title="✖️"
        onPress={() => setModalEditRecipeItemVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    // color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 4,
  },
  container: {
    // flex: 1,
    width: 200,
    height: 400,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  alertFont: {
    color: "red",
  },
});
