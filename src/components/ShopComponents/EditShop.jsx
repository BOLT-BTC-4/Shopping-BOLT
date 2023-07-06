import React, { useEffect, useState, useContext } from "react";
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
import { CornerList } from "./CornerList";
import { AddCorner } from "./AddCorner";
import { table } from "../../../table";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";

export const EditShop = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { item } = route.params;
  console.log("EditShop_item:", item);

  const [corner, setCorner] = useState(item.corner);
  const [selectedCorner, setSelectedCorner] = useState("");
  const [targetString, setTargetString] = useState("");
  const [shopName, setShopName] = useState(item.value);
  const [modalAddCornerVisible, setModalAddCornerVisible] = useState(false);
  const { shopData, setShopData } = useContext(ShareShopDataContext);
  const { shopDataDrop, setShopDataDrop } = useContext(ShareShopDataContext);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shopName: item.shopName,
    },
  });

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
  // ローカルストレージに、shopNameとcornerをオブジェクトとして保存
  // useStateで対応
  const onSubmit = async (data) => {
    const updateShop = {
      shopName: data.shopName,
      corner: corner,
    };

    await updateShoppingListAPI(updateShop);
    fetchShopAPI();
    // const newShopData = [...shopData];
    // newShopData.forEach((obj) => {
    //   if (obj.id === item.id) {
    //     obj.shop = data.shopName;
    //     obj.corner = corner;
    //   }
    // });
    setShopData(newShopData); // 変更された値をセット
    setCorner([]);
    setShopName("");
    navigation.navigate("お店リスト");
  };

  useEffect(() => {}, [corner, shopName]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>お店の名前</Text>
          {errors.shopName && (
            <Text style={styles.alertFont}>お店の名前を入力してください</Text>
          )}
        </View>
        <Controller
          control={control}
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
          rules={{ required: true }}
        />
        <View style={styles.labelBox}>
          <Text style={styles.label}>売場の並び順</Text>
          <TouchableOpacity
            style={styles.buttonLabel}
            onPress={() => setModalAddCornerVisible(true)}
          >
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
            <Text style={styles.buttonText}>売場を追加</Text>
          </TouchableOpacity>
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
        <View style={styles.underBar}>
          <Button
            color="mediumseagreen"
            title="キャンセル"
            onPress={() => {
              navigation.navigate("お店リスト");
              setSelectedCorner("");
              setShopName("");
            }}
          />
          <Button
            color="mediumseagreen"
            title="お店を更新"
            onPress={handleSubmit(onSubmit)}
          />
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
    flex: 1,
    backgroundColor: "white",
    padding: 10,

    minWidth: "100%",
    minHeight: "100%",
    justifyContent: "center",
  },
  labelBox: {
    paddingTop: 15,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "center",
  },
  label: {
    marginRight: 20,
    fontSize: 20,
  },
  buttonLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "mediumseagreen",
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 4,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContents: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  underBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
  },
});
