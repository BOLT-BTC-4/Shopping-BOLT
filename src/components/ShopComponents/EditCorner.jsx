import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
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

export const EditCorner = (props) => {
  const {
    filteredCorner,
    corner,
    setCorner,
    selectedCorner,
    setSelectedCorner,
    setModalEditCornerVisible,
    targetString,
    setTargetString,
  } = props;

  const onSubmit = (data) => {
    if (targetString === "") {
      const newCorner = [...corner]; // 現在のcornerのコピーを作成
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
    setTargetString("");
    setModalEditCornerVisible(false);
  };

  function Divider() {
    return <View style={{ height: 15, borderBottomWidth: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.aaa}>
        <Text style={styles.textTitle}>売場を選択</Text>
        <Button
          title="閉じる"
          onPress={() => {
            setModalEditCornerVisible(false);
            setSelectedCorner("");
          }}
        />
        <View>
          <FlatList
            data={filteredCorner}
            keyExtractor={(item, index) => index.toString()}
            // horizontal={true}
            ItemSeparatorComponent={<Divider />}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.buttonLabel}
                    onPress={() => onSubmit(item)}>
                    <Text> {item}</Text>
                    <MaterialIcons
                      name="add-circle-outline"
                      size={20}
                      color="#b45817"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
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
    minWidth: "60%",
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
