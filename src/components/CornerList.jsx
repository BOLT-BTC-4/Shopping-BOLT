import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export const CornerList = ({
  corner,
  setCorner,
  cornerName,
  setModalAddCornerVisible,
  setTargetString,
}) => {
  const handleDelete = (str) => {
    console.log(str);
    // 選択された行のデータを配列から削除;
    const newCorner = corner.filter((item) => item !== str);
    setCorner(newCorner);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text>{cornerName}</Text>
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color="black"
          onPress={() => {
            setTargetString(cornerName);
            setModalAddCornerVisible(true);
          }}
        />
        <Feather
          name="trash-2"
          size={24}
          color="black"
          onPress={() => handleDelete(cornerName)}
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
    flex: 1,
    width: 200,
    height: 300,
    // justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "white",
  },
  text: {
    lineHeight: 20, // 行間の値を調整する
  },
});
