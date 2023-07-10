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
  TouchableOpacity,
} from "react-native";
import { dataClearAPI } from "../boltAPI";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
// import { TouchableOpacity } from "react-native-web";

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
        console.log("===サインアウト完了===");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    }
    return (
      <View>
        <TouchableOpacity style={styles.buttonTouch} onPress={signOutOriginal}>
          <Text style={styles.buttonInner}>Sign out</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>
          現在のSignInユーザーは、{user.username} です
        </Text>
        {/* // </View> */}
        {/* <> */}
        {/* <Button
          style={styles.button}
          title="Sign Out"
          onPress={signOutOriginal}
          color="#B6C471"
        />
        <Text style={styles.buttonText}>
          現在のSignInユーザーは、{user.username} です
        </Text> */}
      </View>
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
    backgroundColor: "#FFF0D4",
    padding: 10,
  },
  button: {
    // //Sign out
    // justifyContent: "center",
    // alignItems: "center",
    // // fontcolor: "#F5F3F0",
    // height: 40,
    backgroundColor: "#B6C471",

    borderRadius: 20,
    // width: 120,
  },
  buttonTouch: {
    //Sign out
    justifyContent: "center",
    alignItems: "center",
    // fontcolor: "#F5F3F0",
    height: 40,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    width: 120,
  },
  // buttonInner: {
  //   // fontSize: 20,
  //   color: "white",
  // },
});
