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
import { Agenda, Calendars } from "react-native-calendars";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  deleteMenuAPI,
  fetchDateMenuAPI,
  fetchMenuAPI,
  fetchRecipeAndRecipeItemAPI,
} from "../../boltAPI";

export const MenuList = ({ navigation }) => {
  const {
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    allGetMenuFlag,
    setAllGetMenuFlag,
  } = useContext(ShareShopDataContext);

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
  const handleRemoveMenu = async (menuId) => {
    await deleteMenuAPI(menuId);
    setAllGetMenuFlag((prev) => !prev);
  };

  console.log("menu⭐⭐", menu);

  return (
    <View style={{ height: 600 }}>
      <Agenda
        //日付を押したらeditmenuに遷移
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
        }}
        items={menu}
        renderItem={(item, firstItemInDay) => (
          <View style={styles.container}>
            <View style={styles.box}>
              <View style={styles.categoryBox}>
                <Text>{item.category}</Text>
              </View>
              <View style={styles.moziBox}>
                <View style={styles.stack}>
                  <Text style={styles.textSmall}>{`${item.serving}人前`}</Text>
                  <Text style={styles.textRecipeName}>{item.recipeName}</Text>
                </View>
              </View>
              <View style={styles.url}>
                <AntDesign
                  name="link"
                  size={24}
                  color="black"
                  onPress={() => {
                    openURL(item.url);
                  }}
                />
              </View>
              <View style={styles.trash}>
                <Feather
                  name="trash-2"
                  size={24}
                  color="black"
                  onPress={() => handleRemoveMenu(item.menuId)}
                />
              </View>
            </View>
          </View>
        )}
        // Agenda theme
        theme={{
          "stylesheet.agenda.main": {
            reservations: {
              backgroundColor: "#fff0d4",
              marginTop: 80,
            },
            knobContainer: {
              flex: 1,
              position: "absolute",
              left: 0,
              right: 0,
              height: 24,
              bottom: 0,
              alignItems: "center",
              backgroundColor: "#fff0d4",
              borderWidth: 2,
              borderBottomColor: "#B6C471",
              borderLeftColor: "rgba(0,0,0,0)",
              borderRightColor: "rgba(0,0,0,0)",
              borderTopColor: "rgba(0,0,0,0)",
            },
          },
          // agendaDayTextColor: "yellow",
          agendaDayNumColor: "#B45817",
          agendaTodayColor: "#B6C471",
          agendaKnobColor: "#B6C471",
          calendarBackground: "#fff0d4",
          backgroundColor: "#ff0d4",
          selectedDayBackgroundColor: "#B6C471",
          // textSectionTitleColor: "#b6c1cd",
          // textSectionTitleDisabledColor: "#d9e1e8",
          // selectedDayTextColor: "#ffffff",
          // todayTextColor: "#00adf5",
          // dayTextColor: "#2d4150",
          // textDisabledColor: "#d9e1e8",
          // dotColor: "#00adf5",
          // selectedDotColor: "#ffffff",
          // arrowColor: "orange",
          // disabledArrowColor: "#d9e1e8",
          // monthTextColor: "blue",
          // indicatorColor: "blue",
          // textDayFontFamily: "monospace",
          // textMonthFontFamily: "monospace",
          // textDayHeaderFontFamily: "monospace",
          // textDayFontWeight: "300",
          // textMonthFontWeight: "bold",
          // textDayHeaderFontWeight: "300",
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16,
        }}
      />
      <View style={styles.underBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("献立から買い物リストへ追加");
          }}
        >
          <Text style={styles.buttonInner}>献立から追加</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addbtn}
          onPress={() => {
            navigation.navigate("献立登録");
          }}
        >
          <MaterialIcons name="add-circle-outline" size={35} color="#B45817" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0d4", //買い物リストの背景色
    padding: 5,
    // justifyContent: "center",
    // alignContent: "center",
  },
  box: {
    height: 50,
    // width: "100%",
    flex: 1,
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    // paddingLeft: 10,
    paddingRight: 10,
    // paddingBottom: 5,
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 27,
  },
  categoryBox: {
    width: 60,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  moziBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    // padding: 10,
    // justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  stack: {
    flex: 1,
    // backgroundColor: "green",
    // padding: 10,
    // justifyContent: "space-between",
    // alignItems: "center",
    // flexDirection: "row",
  },
  url: {
    // flex: 1,
    width: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  trash: {
    width: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "green",
  },
  underBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginBottom: 12,
    marginRight: 30,
    marginLeft: 20,
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontcolor: "#F5F3F0",
    height: 40,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    width: 120,
  },
  buttonInner: {
    // fontSize: 20,
    color: "white",
  },
  addbtn: {
    marginHorizontal: "3%",
  },
  textSmall: {
    fontSize: 10,
    color: "#B45817",
  },
  textRecipeName: {
    fontSize: 13,
    // color: "#B45817",
  },
});
