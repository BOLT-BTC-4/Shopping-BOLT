import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { CornerList } from "../components/CornerList";
import { AddCorner } from "../components/AddCorner";

export const EditShop = () => {
  const testShop = {
    shopName: "イオン 安城店",
    corners: ["野菜", "お肉", "お魚"],
  };

  const getAllCorners = () => {
    const AllCorners = ["野菜", "果物", "お魚", "お肉"];
  };

  const [corners, setCorners] = useState(testShop.corners);
  const [shop, setShop] = useState(testShop);

  useEffect(() => {
    // getItems();
  }, []);

  console.log(corners);
  console.log(shop);

  return (
    <View style={styles.EditShopContainer}>
      <View>
        <Text>{shop.shopName}</Text>
      </View>
      <View>
        <FlatList
          data={corners}
          renderItem={({ item }) => <CornerList cornerName={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <Text>登録</Text>
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
  EditShopContainer: {
    backgroundColor: "#f0f4f8",
  },
});
