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

export const AddItem = ({ setItems, setAddFlag, setModalAddItemVisible }) => {
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
    //下のfindでマスターitemsからitemを取り出し一致するobjを返す
    let cornarName = (item) => {
      return item.itemName === data.itemName;
    };
    let result = table.masterItem.find(cornarName);
    // (result);
    let newData = {};
    if (result === undefined) {
      (newData = {
        localId: uuid.v4(),
        corner: "",
        itemName: data.itemName,
        quantity: Number(data.quantity),
        unit: "個",
        directions: 99,
        check: false,
      }),
        setItems((items) => [...items, newData]);
    } else {
      (newData = {
        localId: uuid.v4(),
        corner: result.corner,
        item: data.itemName,
        quantity: Number(data.quantity),
        unit: result.unit,
        directions: 99,
        check: false,
      }),
        setItems((items) => [...items, newData]);
    }
    // ("/////", newData);
    //追加するitemをDBの保存////////////////////////////////////////////////////////API
    // await createShoppingListAPI(newData);
    setAddFlag(true);
    reset();
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  // ("errors", errors);

  //   const [open, setOpen] = useState(false);
  //   const [quantity, setQuantity] = useState(null);
  //   const [items, setItems] = useState([
  //     { label: "Apple", value: "apple" },
  //     { label: "Banana", value: "banana" },
  //   ]);
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
