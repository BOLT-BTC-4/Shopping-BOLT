import React, { useEffect, useState, useContext } from "react";
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
import DropDownPicker from "react-native-dropdown-picker"
import { createShoppingListAPI, fetchShoppingListAPI, fetchItemAPI } from "../../boltAPI";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { itemPresetData } from "../../itemPreset";

export const AddItem = ({ setModalAddItemVisible }) => {
  const { setItems, setAddFlag } = useContext(ShareShopDataContext);
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
    },
  });

  const onSubmit = async (data) => {
    //下のfindでItemテーブルからitemを取り出し一致するobjを返す
    let cornarName = (item) => {
      return item.itemName === data.itemName;
    };
    //////////////////////////////////////////////////////////////API🔴
    let itemList = await fetchItemAPI();
    itemList.push(...itemPresetData)
    let result = itemList.find(cornarName)

    let newData = {};
    if (result === undefined) {
      newData = {
        corner: "",
        itemName: data.itemName,
        quantity: Number(data.quantity),
        unit: "個",
        directions: Number(99),
        check: false,
        bought: false,
      };
    } else {
      newData = {
        corner: result.corner,
        itemName: data.itemName,
        quantity: Number(data.quantity),
        unit: "個",
        directions: Number(99),
        check: false,
        bought: false,
      };
    }
    //追加するitemをDBに保存////////////////////////////////////////////API🔴
    await createShoppingListAPI(newData);
    //買い物リスト一覧をDBから取得///////////////////////////////////////API🔴
    const getAllShoppingList = async () => {
      const getShoppingData = await fetchShoppingListAPI();
      setItems(getShoppingData);
    };
    getAllShoppingList();
    setAddFlag(true);
    reset();
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>新規商品</Text>
      {errors.itemName && (
        <Text style={styles.alertFont}>商品名を入力してください</Text>
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

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="追加"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <Button
        color="#fff"
        title="✖️"
        onPress={() => setModalAddItemVisible(false)}
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
    height: 300,
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
//  <DropDownPicker
//    open={open}
//    value={quantity}
//    items={items}
//    setOpen={setOpen}
//    setValue={setQuantity}
//    setItems={setItems}
//    placeholder="Select an item"
//  />;
