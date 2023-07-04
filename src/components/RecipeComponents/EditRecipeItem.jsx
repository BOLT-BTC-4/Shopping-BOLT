import * as React from "react";
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
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: "",
      quantity: "1",
      unit: "個",
    },
  });

  const onSubmit = (data) => {
    // setRecipeItems((prevData) => {
    //   const newData = [...prevData];
    //   const index = newData.findIndex((item) => {
    //     item.name === name);
    //   if (index !== -1) {
    //     newData[index].name = newName;
    //   }
    //   return newData;
    // });
    console.log("Edit:", data);
    // console.log("ITEMNAME:", data.itemName);
    // let newRecipeItemData = {
    //   recipeItemName: data.itemName,
    //   quantity: Number(data.quantity),
    //   unit: data.unit,
    //   corner: "",
    // };
    // console.log("newRecipeItemData", newRecipeItemData);
    // setRecipeItems((items) => [...items, newRecipeItemData]);
    // reset();
  };

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
        name="itemName"
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
