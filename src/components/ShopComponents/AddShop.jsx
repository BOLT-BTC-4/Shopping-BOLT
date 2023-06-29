import React, { useEffect, useState, useContext } from "react";
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
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";

export const AddShop = ({
  navigation,
  props,
  // { selectedValue, selectShop, setSelectShop, navigation }
}) => {
  // const Stack = createNativeStackNavigator();
  // console.log(props);
  // const { navigation } = props;

  const [corner, setCorner] = useState([]);
  const [selectedCorner, setSelectedCorner] = useState("");
  const [targetString, setTargetString] = useState("");
  const [shopName, setShopName] = useState("");
  const [modalAddCornerVisible, setModalAddCornerVisible] = useState(false);
  const { shopData, setShopData } = useContext(ShareShopDataContext);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      shopName: "",
    },
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // ここで処理を再開させる
    alert("登録しました");
    navigation.navigate("お店リスト");
  };

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
    console.log("onSubmit動きました");
    const shop = {
      key: uuid.v4(),
      value: data.shopName,
      corners: corner,
    };
    const newShopData = [...shopData];
    newShopData.push(shop);
    console.log(newShopData);
    setShopData(newShopData); // 変更された値をセット
    setCorner([]);
    setShopName("");
  };

  useEffect(() => {}, [corner, shopName]);

  return (
    <View>
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
            <View style={styles.modalContent}>
              <AddCorner
                filteredCorner={filteredCorner()}
                corner={corner}
                setCorner={setCorner}
                selectedCorner={selectedCorner}
                setSelectedCorner={setSelectedCorner}
                setModalAddCornerVisible={setModalAddCornerVisible}
                targetString={targetString}
                setTargetString={setTargetString}
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
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Button
          title="キャンセル"
          onPress={() => {
            navigation.navigate("お店リスト");
            setSelectedCorner("");
            setShopName("");
          }}
        />
        <Button
          title="新規登録"
          onPress={
            handleSubmit(onSubmit)
            // handleOpenPopup();
            // navigation.navigate("お店リスト");
          }
          // onPress={handleSubmit(onSubmit, () => {
          //   navigation.navigate("お店リスト");
          // })}
        />
      </View>
      <View style={styles.modalPopUpContainer}>
        <View style={styles.modalPopUpContent}>
          <View style={styles.modalPopUpContent}>
            <Modal visible={showPopup} onRequestClose={handleClosePopup}>
              <Text style={styles.text}>ポップアップコンテンツ</Text>
              <Button title="OK" onPress={handleClosePopup} />
            </Modal>
          </View>
        </View>
      </View>

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
    padding: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },

  modalPopUpContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPopUp: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalPopUpContent: {
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
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
