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
import { AddShop } from "./AddShop";

export const ShopScreen = () => {
  return <AddShop />;
};
