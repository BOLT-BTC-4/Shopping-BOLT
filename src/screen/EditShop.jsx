import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CornerList } from "../components/CornerList";
import { AddCorner } from "../components/AddCorner";
import { RegisterButton } from "../components/RegisterButton";

export const EditShop = () => {
  return (
    <View style={styles.editShopContainer}>
      <View>
        <Text>売場登録</Text>
      </View>
      <View>
        <Text>お店の名前</Text>
      </View>
      <View>
        <Text>ゴミ箱</Text>
      </View>
      <View>
        <CornerList />
      </View>
      <View>
        <RegisterButton />
      </View>
      <View>
        <AddCorner />
      </View>
      <View>
        <AddCorner />
      </View>
      <View>
        <TouchableOpacity
          onLongPress={() => {
            alert("長押しタップ成功！");
          }}
        >
          <Text
            style={{
              color: "white",
              backgroundColor: "blue",
              height: 30,
              fontSize: 30,
            }}
          >
            ここを長押ししてください
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editShopContainer: {
    backgroundColor: "#f0f4f8",
  },
});
