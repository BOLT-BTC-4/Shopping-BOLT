import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
} from "react-native";

export const AddCorner = (props) => {
  const {
    filteredCorner,
    corner,
    setCorner,
    selectedCorner,
    setSelectedCorner,
    setModalAddCornerVisible,
    targetString,
    setTargetString,
  } = props;

  const onSubmit = (data) => {
    if (targetString === "") {
      const newCorner = [...corner]; // 現在のcornersのコピーを作成
      newCorner.push(data); // 新しい値を追加
      setCorner(newCorner); // 変更された値をセット
    } else {
      const index = corner.findIndex((item) => item === targetString);
      if (index !== -1) {
        const item = data; // 新しい行のデータ
        const newCorner = [...corner];
        newCorner.splice(index + 1, 0, item);
        setCorner(newCorner);
      }
    }
    setModalAddCornerVisible(false);
    setTargetString("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.aaa}>
        <View>
          <SelectList
            setSelected={(val) => setSelectedCorner(val)}
            data={filteredCorner}
            save="value"
            searchPlaceholder="売場を入力して検索"
            placeholder="売場を選択"
            maxHeight={400}
            onSelect={() => onSubmit(selectedCorner)}
          />
        </View>
        <Button
          title="キャンセル"
          onPress={() => {
            setModalAddCornerVisible(false);
            setSelectedCorner("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  aaa: {
    minWidth: "80%",
    height: "60%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
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
  shopSelect: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  // shoppingCart: {
  //   textAlign: "right",
  //   marginRight: 30,
  //   marginBottom: 30,
  //   marginTop: 10,
  // },
  underBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 20,
    marginTop: 10,
  },
});
