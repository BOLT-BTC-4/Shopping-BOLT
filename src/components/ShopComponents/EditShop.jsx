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
import { EditCorner } from "./EditCorner";
import { table } from "../../../table";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { updateShopAPI, fetchShopAPI } from "../../boltAPI";

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
  const [modalEditCornerVisible, setModalEditCornerVisible] = useState(false);
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
      id: item.id,
      shopName: data.shopName,
      corner: corner,
    };
    await updateShopAPI(updateShop);

    // ここからShareShopDataContext.jsxのgetAllShopと同じ内容（1つにまとめたい）
    const initShopData = await fetchShopAPI();
    //ドロップダウンで利用できるようにオブジェクトキー変更
    const getArrayDropDownList = initShopData.map((item) => {
      return { key: item.id, value: item.shopName, corner: item.corner };
    });
    setShopData(initShopData);
    setShopDataDrop(getArrayDropDownList);
    // ここまで同じ内容

    setCorner([]);
    setShopName("");
    navigation.navigate("お店リスト");
  };

  const handleCornerUpdate = () => {
    setModalEditCornerVisible(true);
  };

  useEffect(() => {}, [corner, shopName]);

  return (
    <View style={styles.container}>
      <View style={styles.shopNameBox}>
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
      <View style={styles.cornerBox}>
        <Text style={styles.label}>売場の並び順</Text>
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={() => setModalAddCornerVisible(true)}
        >
          {/* <MaterialIcons name="add-circle-outline" size={24} color="black" /> */}
          <Text style={styles.buttonInner}>売場を追加</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={corner}
        renderItem={({ item }) => (
          <CornerList
            corner={corner}
            setCorner={setCorner}
            cornerName={item}
            setModalEditCornerVisible={setModalEditCornerVisible}
            handleCornerUpdate={handleCornerUpdate}
            setTargetString={setTargetString}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.underBar}>
        {/* スタイル統一にあたり、buttonからTouchableOpacityに変更 */}
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={() => {
            navigation.navigate("お店リスト");
            setSelectedCorner("");
            setShopName("");
          }}
        >
          <Text style={styles.buttonInner}>キャンセル</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonInner}>お店を更新</Text>
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
      <Modal
        visible={modalEditCornerVisible}
        animationType="none"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EditCorner
              filteredCorner={filteredCorner()}
              corner={corner}
              setCorner={setCorner}
              selectedCorner={selectedCorner}
              setSelectedCorner={setSelectedCorner}
              setModalEditCornerVisible={setModalEditCornerVisible}
              targetString={targetString}
              setTargetString={setTargetString}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0D4",
    padding: 10,
  },

  cornerBox: {
    paddingTop: 15,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    marginRight: 10,
    marginBottom: 4,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#FFF0D4",
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },

  alertFont: {
    color: "red",
  },

  underBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 5,
    marginHorizontal: "10%",
    marginTop: 1,
  },

  buttonTouch: {
    //購入したよ　キャンセル、お店を登録
    justifyContent: "center",
    alignItems: "center",
    fontcolor: "#F5F3F0",
    height: 40,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    width: 120,
    // marginLeft: "10%",
  },
  buttonInner: {
    // fontSize: 20,
    color: "white",
  },

  buttonText: {
    fontSize: 18,
    color: "mediumseagreen",
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
});
