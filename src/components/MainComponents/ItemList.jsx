import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { EditItem } from "./EditItem";

export const ItemList = ({
  item,
  handleCheck,
  handleRemoveItem,
  items,
  setItems,
  setAddFlag,
}) => {
  //モーダルのuseState
  const [modalEditItemVisible, setModalEditItemVisible] = useState(false);

  return (
    <View style={item.check ? [styles.box, styles.check] : styles.box}>
      <TouchableOpacity
        style={styles.cornerBox}
        onPress={() => handleCheck(item.id)}
      >
        <Text style={styles.text}>{item.corner}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.moziBox}
        onPress={() => handleCheck(item.id)}
      >
        <View style={styles.stack}>
          <Text style={styles.textSmall}>{item.recipeName}</Text>
          <Text style={styles.text}>{item.itemName}</Text>
        </View>
        <Text style={styles.text}>{item.quantity}</Text>
      </TouchableOpacity>

      <View style={styles.iconBox}>
        <Text style={styles.text}>{item.unit}</Text>

        <Feather
          name="edit"
          size={20}
          color="black"
          onPress={() => setModalEditItemVisible(true)}
        />
        {/* item編集モーダル */}
        <Modal
          visible={modalEditItemVisible}
          animationType="none"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <EditItem
                items={items}
                setItems={setItems}
                setAddFlag={setAddFlag}
                item={item}
                setModalEditItemVisible={setModalEditItemVisible}
              />
            </View>
          </View>
        </Modal>

        <Feather
          name="trash-2"
          size={20}
          color="black"
          onPress={() => handleRemoveItem(item.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: "100%",
    borderWidth: 1.5,
    borderBottomColor: "#b6c471",
    // borderStyle: "dotted",      //点線にできない
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  check: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
    width: 70,
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
  textSmall: {
    fontSize: 10,
    color: "#B45817",
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
  stack: {},
});
