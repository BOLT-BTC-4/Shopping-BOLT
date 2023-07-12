import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import { table } from "../../../table";
import uuid from "react-native-uuid";
import { createShoppingListAPI } from "../../boltAPI";

export const AddRecipeItem = ({
  recipeItems,
  setRecipeItems,
  setAddRecipeItemFlag,
  setModalAddRecipeItemVisible,
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
    let newRecipeItemData = {
      id: uuid.v4(),
      recipeItemName: data.itemName,
      quantity: Number(data.quantity),
      unit: data.unit,
      corner: "",
    };
    //console.log("newRecipeItemData", newRecipeItemData);
    setRecipeItems((items) => [...items, newRecipeItemData]);
    setModalAddRecipeItemVisible(false);
    // reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>材料</Text>
      {errors.itemName && (
        <Text style={styles.alertFont}>材料名を入力してください</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>
      <Button
        color="#fff"
        title="✖️"
        onPress={() => setModalAddRecipeItemVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    margin: 20,
    marginLeft: 0,
  },
  button: {
    margin: 8,
    backgroundColor: "#b6c471",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    // flex: 1,
    width: 200,
    height: 400,
    justifyContent: "center",
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
