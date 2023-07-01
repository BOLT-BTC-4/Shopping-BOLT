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
import { MenuList } from "../components/MenuComponents/MenuList";
export const MenuScreen = ({ navigation }) => {
  return (
    <View>
      <MenuList navigation={navigation} />
    </View>
  );
};
