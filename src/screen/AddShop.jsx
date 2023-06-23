import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { CornerList } from "../components/CornerList";
import { AddCorner } from "../components/AddCorner";
import { table } from "../../table";

export const AddShop = (props) => {
  console.log("=====AddShopだよ=====");
  const {
    corners,
    setCorners,
    shopName,
    setShopName,
    selectedValue,
    setSelectedValue,
  } = props;

  // useState一覧
  const [modalVisible, setModalVisible] = useState(false);
  const [targetString, setTargetString] = useState("");

  // モーダル画面を表示するための関数
  const openModal = (index) => {
    setModalVisible(true);
  };

  // モーダル画面を閉じるための関数
  const closeModal = () => {
    setModalVisible(false);
  };

  // 未実装（テストデータとして準備）
  // DBから取得する情報
  const getAllCorners = () => {
    return table.masterCorner;
  };

  // DBから取得した売場から現状設定している売場を抜いた、売場を返す
  const filteredCorners = () => {
    console.log("=====追加ボタン押されました======");
    const allCorners = getAllCorners();
    // getAllCorners配列にcornerが含まれていない場合に真となり配列に追加される
    const result = allCorners.filter((corner) => !corners.includes(corner));
    return result;
  };

  const handleDelete = (str) => {
    console.log(str);
    // 選択された行のデータを配列から削除;
    const newCorners = corners.filter((item) => item !== str);
    setCorners(newCorners);
  };

  const handleTargetString = (str) => {
    setTargetString(str);
  };

  const handleAddAfter = () => {
    openModal();
    // console.log("追加ボタン");
    // const index = corners.findIndex(
    //   (item) => item.targetString === targetString
    // );
    // if (index !== -1) {
    //   const newCorner = selectedValue; // 新しい行のデータ
    //   const newCorners = [...corners];
    //   newCorners.splice(index + 1, 0, newCorner);
    //   setCorners(newCorners);
    // }
  };

  // useStateに変更された売場を追加する
  const handleCornersChange = () => {
    console.log("targetString:", targetString);
    if (targetString === "") {
      console.log("空白だよ");
      const newCorners = [...corners]; // 現在のcornersのコピーを作成
      newCorners.push(selectedValue); // 新しい値を追加
      setCorners(newCorners); // 変更された値をセット
      setTargetString("");
    } else {
      console.log("空白じゃないよ");
      console.log("corners:", corners);
      const index = corners.findIndex((item) => item === targetString);
      console.log("index:", index);
      if (index !== -1) {
        const newCorner = selectedValue; // 新しい行のデータ
        const newCorners = [...corners];
        newCorners.splice(index + 1, 0, newCorner);
        setCorners(newCorners);
      }
      setTargetString("");
    }
  };

  // useStateに店の名前を追加する
  const handleInputChange = (value) => {
    setShopName(value);
  };

  useEffect(() => {}, [corners]);

  return (
    <View style={styles.EditShopContainer}>
      <View style={styles.container}>
        <View>
          <Text>AddShopだよ</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={shopName}
            onChangeText={handleInputChange}
            placeholder="入力してください"
          />
        </View>
        <View>
          <FlatList
            data={corners}
            renderItem={({ item }) => (
              <CornerList
                cornerName={item}
                handleDelete={handleDelete}
                handleAddAfter={handleAddAfter}
                handleTargetString={handleTargetString}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Button
            title="売場追加"
            onPress={() => {
              openModal();
            }}
          />
        </View>
        <View>
          <Modal visible={modalVisible} animationType="none" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <AddCorner
                  filteredCorners={filteredCorners()}
                  setCorners={setCorners}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                />
                <View style={styles.buttonContainer}>
                  <Button title="キャンセル" onPress={closeModal} />
                  <Button
                    title="OK"
                    onPress={() => {
                      closeModal();
                      handleCornersChange();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EditShopContainer: {
    // flex: 1,
    justifyContent: "space-between",
  },
  container: {
    // flex: 1,
    width: 300,
    height: 475,
  },
  modalContainer: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: "row", // 横方向に配置
    justifyContent: "space-between", // ボタンを均等に配置
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  bottomContainer: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
});
