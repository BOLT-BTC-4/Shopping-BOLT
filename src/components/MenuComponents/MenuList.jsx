import React, { useContext } from "react";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { AntDesign, Feather } from "@expo/vector-icons";
import { deleteMenuAPI } from "../../boltAPI";

export const MenuList = ({ navigation }) => {
  const { selectedDay, setSelectedDay, menu, setMenu } =
    useContext(ShareShopDataContext);

  const openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(`このURLは開けません: ${url}`);
        }
      })
      .catch((error) => console.log("urlエラー", error));
  };

  // 選択した献立の削除 → 献立リスト一覧の取得
  const handleRemoveMenu = async (id) => {
    id = "8a9206ab-4c34-4907-ac40-50f40a2e170b";
    console.log("🤩id: ", id);
    await deleteMenuAPI(id);
    // const shoppingListData = await fetchShoppingListAPI();
    // setItems(shoppingListData);
  };
  return (
    <View style={{ height: 600 }}>
      <Agenda
        //日付を押したらeditmenuに遷移
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
          navigation.navigate("献立登録/編集");
        }}
        items={menu}
        renderItem={(item, firstItemInDay) => (
          <View style={styles.box}>
            <View style={styles.cornerBox}>
              <Text>{item.category}</Text>
            </View>
            <View style={styles.moziBox}>
              <Text
                style={styles.text}
                width={100}
                // onPress={() => handleCheck(item.id)}
              >
                {item.recipeName}
              </Text>
              <AntDesign
                name="link"
                size={24}
                color="black"
                onPress={() => {
                  openURL(item.url);
                }}
              />
              <Feather
                name="trash-2"
                size={24}
                color="black"
                onPress={() => handleRemoveMenu(item.date, item.id)}
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("献立から買い物リストへ追加");
        }}>
        <Text style={styles.buttonInner}>献立から買い物リストへ追加</Text>
      </TouchableOpacity>
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
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 33,
  },
  cornerBox: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    marginTop: 5,
    marginVertical: "20%",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "80%",
    marginLeft: "10%",
  },
  buttonInner: {
    fontSize: 20,
  },
});
