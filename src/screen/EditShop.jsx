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

export const EditShop = (props) => {
  // テストデータ
  const testShop = {
    shopName: "イオン 安城店",
    corners: ["野菜", "お肉", "お魚"],
  };

  // useState一覧
  const [modalVisible, setModalVisible] = useState(false);
  const [corners, setCorners] = useState(testShop.corners);
  const [shopName, setShopName] = useState(testShop.shopName);
  const [selectedValue, setSelectedValue] = useState("");

  // モーダル画面を表示するための関数
  const openModal = () => {
    setModalVisible(true);
  };

  // モーダル画面を閉じるための関数
  const closeModal = () => {
    setModalVisible(false);
  };

  // 未実装（テストデータとして準備）
  // DBから取得する情報
  const getAllCorners = () => {
    return ["野菜", "果物", "お魚", "お肉", "日用品", "お菓子", "お惣菜"];
  };

  // DBから取得した売場から現状設定している売場を抜いた、売場を返す
  const filteredCorners = () => {
    console.log("=====追加ボタン押されました======");
    const allCorners = getAllCorners();
    // getAllCorners配列にcornerが含まれていない場合に真となり配列に追加される
    const result = allCorners.filter((corner) => !corners.includes(corner));
    console.log("result", result);
    return result;
  };

  // useStateに変更された売場を追加する
  const handleCornersChange = () => {
    const newCorners = [...corners]; // 現在のcornersのコピーを作成
    newCorners.push(selectedValue); // 新しい値を追加
    setCorners(newCorners); // 変更された値をセット
  };

  // useStateに店の名前を追加する
  const handleInputChange = (value) => {
    setShopName(value);
  };

  // 未実装
  // ローカルストレージに、shopNameとcornersをオブジェクトとして保存
  const handleButtonPress = () => {
    const shop = {
      shopName: shopName,
      corners: corners,
    };
    console.log("ショップ情報:", shop);
  };

  useEffect(() => {
    // getItems();
  }, []);

  return (
    <View style={styles.EditShopContainer}>
      <View style={styles.container}>
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
            renderItem={({ item }) => <CornerList cornerName={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Button title="登録ボタン" onPress={handleButtonPress} />
          <Button
            title="追加"
            onPress={() => {
              openModal();
              filteredCorners();
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
    height: 425,
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
