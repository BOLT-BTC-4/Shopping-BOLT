import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CornerList } from "../MainComponents/CornerList";
import { AddCorner } from "../MainComponents/AddCorner";
import { table } from "../../../table";
import uuid from "react-native-uuid";

export const AddShop = (
  props
  // { selectedValue, selectShop, setSelectShop, navigation }
) => {
  const Stack = createNativeStackNavigator();
  console.log(props);
  const { newShopButton, navigation } = props;

  // console.log("navigation:", navigation);
  // console.log("selectedValue:", selectedValue);
  console.log("AddShop_newShopButton:", newShopButton);
  const {
    // shopName,
    // setShopName,

    // selectedValue,
    // setSelectedValue,
    handleSubmit,
    control,
    // errors,
    // reset,
  } = useForm({
    defaultValues: {
      shopName: "",
    },
  });

  // useState一覧
  const [modalAddCornerVisible, setModalAddCornerVisible] = useState(false);
  const [corner, setCorner] = useState([]);
  const [selectedCorner, setSelectedCorner] = useState("");
  // const [modalVisible, setModalVisible] = useState(false);
  // const [targetString, setTargetString] = useState("");
  const [shopName, setShopName] = useState("");

  // 未実装（テストデータとして準備）
  // DBから取得する情報
  const getAllCorner = () => {
    return table.masterCorner;
  };

  // DBから取得した売場から現状設定している売場を抜いた、売場を返す
  const filteredCorner = () => {
    const allCorner = getAllCorner();
    // getAllCorner配列にcornerが含まれていない場合に真となり配列に追加される
    const result = allCorner.filter((val) => !corner.includes(val));
    return result;
  };

  // 未実装
  // ローカルストレージに、shopNameとcornersをオブジェクトとして保存
  // useStateで対応
  const onSubmit = (data) => {
    const shop = {
      key: uuid.v4(),
      value: data.shopName,
      corners: corner,
    };
    const newShopList = [...selectShop];
    newShopList.push(shop);
    console.log(newShopList);
    setSelectShop(newShopList); // 変更された値をセット
    setCorner([]);
    setShopName("");
  };

  useEffect(() => {}, [newShopButton, corner]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>お店の名前</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)} //handleInputChange
            value={value}
            placeholder="お店の名前を入力してください"
          />
        )}
        name="shopName"
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>売場の並び順</Text>
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color="black"
          onPress={() => setModalAddCornerVisible(true)}
        />
      </View>
      <Modal
        visible={modalAddCornerVisible}
        animationType="none"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <AddCorner
              filteredCorner={filteredCorner()}
              corner={corner}
              setCorner={setCorner}
              selectedCorner={selectedCorner}
              setSelectedCorner={setSelectedCorner}
              // setModalAddCornerVisible={setModalAddCornerVisible}
              // targetString={targetString}
              // setTargetString={setTargetString}
            />
          </View>
        </View>
      </Modal>

      <FlatList
        data={corner}
        renderItem={({ item }) => (
          <CornerList
            corner={corner}
            setCorner={setCorner}
            cornerName={item}
            setModalAddCornerVisible={setModalAddCornerVisible}
            setTargetString={setTargetString}
            // handleDelete={handleDelete}
            // handleAddAfter={handleAddAfter}
            // handleTargetString={handleTargetString}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* {errors.shopName && <Text>This is required.</Text>} */}
      {/* <Button title="キャンセル" onPress={handleSubmit(onSubmit)} /> */}
      {/* closeModalNewShop */}
      {/* <TouchableOpacity
        style={styles.box}
        onPress={() => {
          navigation.navigate("お店編集");
        }}
      > */}
      <Button
        title="キャンセル"
        onPress={() => {
          navigation.navigate("お店リスト");
          // setSelectedCorner("");
          // setShopName("");
        }}
      />
      <Button title="新規登録" onPress={handleSubmit(onSubmit)} />

      {/* 正常に動作しなかったため、ボタンだけ変更はボツ
      {newShopButton ? (
        <Button title="新規登録" onPress={handleSubmit(onSubmit)} />
      ) : (
        <Button title="更新" onPress={handleSubmit(onSubmit)} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",

    // justifyContent: "center",
    // alignContent: "center",
  },
  modalContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    width: 300,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // buttonContainer: {
  //   flexDirection: "row", // 横方向に配置
  //   justifyContent: "space-between", // ボタンを均等に配置
  //   marginTop: 20,
  // },
  // input: {
  //   height: 40,
  //   borderColor: "gray",
  //   borderWidth: 1,
  //   marginBottom: 16,
  //   paddingHorizontal: 8,
  // },
  // bottomContainer: {
  //   marginBottom: 40,
  //   paddingHorizontal: 16,
  // },
  // separator: {
  //   height: 1,
  //   backgroundColor: "gray",
  // },
});
