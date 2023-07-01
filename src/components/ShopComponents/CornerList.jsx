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
    <View style={styles.box}>
      <View style={styles.moziBox}>
        <Text style={styles.text}>{cornerName}</Text>
        <View style={styles.iconBox}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  check: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textDecorationLine: "line-through",
  },

  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  cornerBox: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },

  subText: {
    fontSize: 12,
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
});
