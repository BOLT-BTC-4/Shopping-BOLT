import { Alert, Linking } from "react-native";

// レシピURLを開く
export const openURL = (url) => {
  console.log("url:", url);
  if (url === !null) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(`このURLは開けません: ${url}`);
        }
      })
      .catch((error) => console.log("urlエラー", error));
  } else {
    alert("このURLは登録されていません");
  }
};
