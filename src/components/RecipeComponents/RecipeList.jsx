import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { table } from "../../../table";
import uuid from "react-native-uuid";

export const RecipeList = () => {
  return (
    <View>
      <Text>レシピリストです</Text>
    </View>
  );
};
