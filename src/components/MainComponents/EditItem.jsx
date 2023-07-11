import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import { table } from "../../../table";
import uuid from "react-native-uuid";
import {
  updateShoppingListAPI,
  fetchShoppingListAPI,
  createItemAPI,
} from "../../boltAPI";

export const EditItem = ({
  items,
  setItems,
  setAddFlag,
  item,
  setModalEditItemVisible,
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
      itemName: item.itemName,
      quantity: item.quantity.toString(),
      unit: item.unit,
    },
  });
  const [selectedCorner, setSelectedCorner] = React.useState("");

  const onSubmit = async (data) => {
    const newItems = [...items];
    const itemCopy = newItems.find((newItem) => newItem.id === item.id);
    itemCopy.corner = selectedCorner;
    itemCopy.itemName = data.itemName;
    itemCopy.quantity = data.quantity;
    itemCopy.unit = data.unit;
    //追加するitemをDBに保存////////////////////////////////////////////API🔴
    await updateShoppingListAPI(itemCopy);
    await createItemAPI(itemCopy); //coner売り場のマスターへも登録
    //買い物リスト一覧をDBから取得///////////////////////////////////////API🔴
    const getAllShoppingList = async () => {
      const getShoppingData = await fetchShoppingListAPI();
      setItems(getShoppingData);
    };
    getAllShoppingList();
    setItems(shoppingListData);
    const newFlag = true;
    setAddFlag(newFlag);
    setModalEditItemVisible(false);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  // console.log("errors", errors);

  //   const [open, setOpen] = useState(false);
  //   const [quantity, setQuantity] = useState(null);
  //   const [items, setItems] = useState([
  //     { label: "Apple", value: "apple" },
  //     { label: "Banana", value: "banana" },
  //   ]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>売り場</Text>
      <View>
        <SelectList
          setSelected={(val) => setSelectedCorner(val)}
          data={table.masterCorner}
          save="value"
          searchPlaceholder="売り場を入力"
          placeholder="売り場を選択"
          maxHeight={200}
          defaultOption={{ key: item.corner, value: item.corner }}
        />
      </View>
      <Text style={styles.label}>商品名</Text>
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
          title="変更"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <Button
        color="#fff"
        title="✖️"
        onPress={() => setModalEditItemVisible(false)}
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
    minWidth: "70%",
    minHeight: "50%",
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
