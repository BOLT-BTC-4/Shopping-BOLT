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
import { AntDesign } from "@expo/vector-icons";

export const MenuList = ({ navigation }) => {
  const { selectedDay, setSelectedDay, selectedMenu, setSelectedMenu } =
    useContext(ShareShopDataContext);

  const selectReceipes = {
    "2023-06-28": [
      {
        categry1: "主食",
        recipe: "俺のチャーハン",
        url: "https://www.kurashiru.com/recipes/fdf4cc7f-7275-45e7-b49b-df889fc19df6",
      },
      {
        categry1: "主菜",
        recipe: "俺のからあげ",
        url: "https://dig-zamas.com/",
      },
    ],
    "2023-06-29": [
      {
        categry1: "主菜",
        recipe: "俺の卵焼き",
        url: "https://www.kurashiru.com/recipes/fdf4cc7f-7275-45e7-b49b-df889fc19df6",
      },
      {
        categry1: "汁物",
        recipe: "具だくさん味噌汁",
        url: "https://cpoint-lab.co.jp/article/202011/17618/",
      },
    ],
  };

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
  return (
    <View style={{ height: 600 }}>
      <Agenda
        //日付を押したらeditmenuに遷移
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
          navigation.navigate("献立登録/編集");
        }}
        items={selectedMenu}
        renderItem={(item, firstItemInDay) => (
          <View style={styles.box}>
            <View style={styles.cornerBox}>
              <Text>{item.categry1}</Text>
            </View>
            <View style={styles.moziBox}>
              <Text
                style={styles.text}
                width={100}
                // onPress={() => handleCheck(item.localId)}
              >
                {item.recipe}
              </Text>
              <AntDesign
                name="link"
                size={24}
                color="black"
                onPress={() => {
                  openURL(item.url);
                }}
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("献立から買い物リストへ追加");
        }}
      >
        <Text style={styles.buttonInner}>献立を登録</Text>
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
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "50%",
    marginLeft: "25%",
  },
  buttonInner: {
    fontSize: 20,
  },
});
