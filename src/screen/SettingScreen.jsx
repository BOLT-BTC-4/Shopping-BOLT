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
  Pressable,
} from "react-native";
import { dataClearAPI } from "../boltAPI";
import { Auth } from "aws-amplify";
import { useAuthenticator, } from "@aws-amplify/ui-react-native";



export const SettingScreen = () => {

  //  useAuthenticator'から'user'の現在の値のみを取り出す。
  const userSelector = (context) => [context.user];

  const SignOutButton = () => {
    const { user } = useAuthenticator(userSelector);
    // サインアウトしたら、ローカルのデータをクリアする
    async function signOutOriginal() {
      try {
        await dataClearAPI(); // サインアウトしたら、ローカルのデータをクリアする
        await Auth.signOut();
        console.log("===サインアウト完了===")
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
    return (
      <>
        <Button
          title="Sign Out"
          onPress={signOutOriginal}
          color="mediumseagreen"
        />
        <Text style={styles.buttonText}>
          現在のSignInユーザーは、{user.username} です
        </Text>

      </>
    );
  };


  return (
    <>
      <View style={styles.container}>
        <SignOutButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});