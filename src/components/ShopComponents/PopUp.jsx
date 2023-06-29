import React, { useState } from "react";
import { View, Button, Text, Modal } from "react-native";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // ここで処理を再開させる
    console.log("OK ボタンが押されました");
  };

  return (
    <View>
      <Button title="ポップアップを開く" onPress={handleOpenPopup} />

      <Modal visible={showPopup} onRequestClose={handleClosePopup}>
        <View>
          <Text>ポップアップコンテンツ</Text>
          <Button title="OK" onPress={handleClosePopup} />
        </View>
      </Modal>
    </View>
  );
};

export default App;
