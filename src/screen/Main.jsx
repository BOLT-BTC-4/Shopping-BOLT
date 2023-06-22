import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import { EditShop } from "./EditShop";

export const Main = (props) => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="モーダルボタンテスト" onPress={openModal} />
      <Modal visible={modalVisible} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Button title="Close Modal" onPress={closeModal} />
            <EditShop />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Mainページを下に表示
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
