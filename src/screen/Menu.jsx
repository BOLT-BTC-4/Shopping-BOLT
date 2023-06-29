import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { MenuList } from "../components/MenwComponents/MenuList";
export const Menu = () => {
  return (
    <View>
      <MenuList />
      <Text>献立から買い物リストに追加</Text>
    </View>
  );
};
