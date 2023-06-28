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
export const MenuScreen = () => {
  return (
    <View>
      <Text>MenuList</Text>
      <MenuList />
    </View>
  );
};
