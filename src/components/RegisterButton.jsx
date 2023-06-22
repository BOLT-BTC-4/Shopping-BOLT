import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const RegisterButton = () => {
  return (
    <View style={styles.squareButton}>
      <Text style={styles.squareButtonLabel}>登録</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  squareButton: {
    backgroundColor: "#467fd3",
    width: 200,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // right: 40,
    // bottom: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  squareButtonLabel: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 40,
    lineHeight: 40,
  },
});
