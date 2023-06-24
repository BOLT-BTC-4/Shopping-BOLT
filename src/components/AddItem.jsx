import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import { table } from "../../table";
import uuid from "react-native-uuid";

export const AddItem = ({ setItems }) => {
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
  const onSubmit = (data) => {
    let cornarName = (item) => {
      return item.itemName === data.itemName;
    };
    let result = table.masterItem.find(cornarName);
    // console.log(result);
    if (result === undefined) {
      setItems((items) => [
        ...items,
        {
          localId: uuid.v4(),
          sales: "",
          itemName: data.itemName,
          quantity: data.quantity,
          unit: "個",
          directions: 1,
          check: false,
        },
      ]);
    } else {
      setItems((items) => [
        ...items,
        {
          localId: uuid.v4(),
          sales: result.sales,
          itemName: data.itemName,
          quantity: data.quantity,
          unit: result.unit,
          directions: 1,
          check: false,
        },
      ]);
    }
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log("errors", errors);

  //   const [open, setOpen] = useState(false);
  //   const [quantity, setQuantity] = useState(null);
  //   const [items, setItems] = useState([
  //     { label: "Apple", value: "apple" },
  //     { label: "Banana", value: "banana" },
  //   ]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>新規商品</Text>
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
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
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
