import { Alert, Linking } from "react-native";

// レシピURLを開く
export const openURL = (url) => {
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