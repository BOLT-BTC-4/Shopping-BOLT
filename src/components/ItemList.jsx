import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { StyleSheet, Text, View, Modal, Button } from "react-native";
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
      <View style={styles.salesBox}>
        <Text style={styles.text}>{item.sales}</Text>
      </View>

      <View style={styles.moziBox}>
        <Text style={styles.text} onPress={() => handleCheck(item.localId)}>
          {item.itemName}
        </Text>
        <Text style={styles.text}>{item.quantity}</Text>
      </View>

      <View style={styles.iconBox}>
        <Text style={styles.text}>{item.unit}</Text>

        <Feather
          name="edit"
          size={24}
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
          size={24}
          color="black"
          onPress={() => handleRemoveItem(localId)}
        />
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

  salesBox: {
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
