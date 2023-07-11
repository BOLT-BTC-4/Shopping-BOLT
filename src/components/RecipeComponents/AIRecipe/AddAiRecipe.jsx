import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Chat } from "./Chat";
import SelectDropdown from "react-native-select-dropdown";
import { selectData } from "./gptSelectValue";
import { useForm, Controller } from "react-hook-form";
import { createRecipeAPI, fetchRecipeAPI } from "../../../boltAPI";
import { ShareShopDataContext } from "../../../screen/ShareShopDataContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const AddAiRecipe = ({ navigation }) => {
  const {
    selectTargetData,
    selectFeelingData,
    selectGenreData,
    selectCategoryData,
    selectServingData,
    loadingMessages,
  } = selectData;

  const {
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // useState、useContext
  const { setRecipeData } = useContext(ShareShopDataContext);
  const [answer, setAnswer] = useState(false);
  const [jsAnswer, setJSAnswer] = useState("");
  const [userInputItem, setUserInputItem] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("家族");
  const [selectedFeeling, setSelectedFeeling] = useState("喜びそうな");
  const [selectedGenre, setSelectedGenre] = useState("おすすめの");
  const [selectedCategory, setSelectedCategory] = useState("主菜");
  const [selectedServing, setSelectedServing] = useState(4);
  const [questionText, setQuestionText] = useState("");
  // ローディング表示用のステート
  const [loading, setLoading] = useState(false);
  const [loadingDisplayMsg, setLoadingDisplayMsg] = useState();

  // const loadingMessages = [
  //   "メッセージ1",
  //   "メッセージ2",
  //   "メッセージ3",
  //   "メッセージ4",
  //   // 追加のメッセージ
  // ];

  // プルダウンメニューやインプットボックスの値を変更した時の動作
  const handleMessageChange = (value) => {
    setUserInputItem(value);
  };

  const handleTargetChange = (value) => {
    setSelectedTarget(value);
  };

  const handleFeelingChange = (value) => {
    setSelectedFeeling(value);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleServingChange = (value) => {
    setSelectedServing(value);
  };

  const handleSubmit = async () => {
    setAnswer(false);
    console.log("Chat-GPTに考えてもらっています");

    // 入力値を取得
    const userInputItemText = userInputItem;
    const selectedTargetText = selectedTarget;
    const selectedFeelingText = selectedFeeling;
    const selectedGenreText = selectedGenre;
    const selectedCategoryText = selectedCategory;
    const selectedServingText = selectedServing;

    // 文章の組み立て
    // ユーザが見る文章
    const displayText = `${userInputItemText}を使った、${selectedTargetText}が${selectedFeelingText}、${selectedGenreText}${selectedCategoryText}のレシピ、${selectedServingText}人前`;
    // GPTに送る文章
    const generatedText = `${displayText}を教えてください。①レシピ名、②食材、③分量、④単位、⑤つくり方を教えて下さい。作り方は、工程ごとで区切って教えてください。必ず分量と単位は分けてください。分量には文字を入れず単位に文字を入れてください。①から⑤の情報をJavaScriptで利用できるように下記の配列とオブジェクトのフォーマットで、必ずJSON形式で回答をしてください。
    {
      recipeName:①レシピ名,
      serving:1,
      recipeItems:[{ recipeItemName: ②食材, quantity: ③分量, unit: ④単位 },{ itemName: ②食材, quantity: ③分量, unit: ④単位 },...],
      memo:⑤作り方,
    }`;
    setQuestionText(displayText);

    // JSONファイルかどうかの確認
    function isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    }

    // APIリクエストを開始する前にローディング表示を開始
    setLoading(true);

    try {
      // Chat.jsx にメッセージを渡して API から回答を取得
      const responseText = await Chat(generatedText);
      console.log("isJSON:", isJSON(responseText));
      console.log(responseText);

      // エラーが発生しなかった場合の処理
      if (isJSON(responseText)) {
        // 回答の格納
        setAnswer(responseText);

        const jsData = JSON.parse(responseText);
        console.log("jsData.recipeName:", jsData.recipeName);
        console.log("jsData.recipeItems:", jsData.recipeItems);
        console.log("jsData:", jsData);
        setJSAnswer(jsData);
      } else {
        // const jsData = responseText;
        // console.log("jsData.recipeName:", jsData.recipeName);
        // console.log("jsData.recipeItems:", jsData.recipeItems);
        // console.log("jsData:", jsData);
        // setJSAnswer(jsData);
        alert(
          `頭がパンクしました　○|￣|＿\n少し休憩が必要です\nしばらく経ってから\nもう一度実行してください`
        );
      }
    } catch (error) {
      // エラーが発生した場合の処理
      alert(
        `頭がパンクしました　○|￣|＿\n少し休憩が必要です\nしばらく経ってから\nもう一度実行してください\n ${error.message}`
      );
    } finally {
      console.log("レシピを思いつきました！");
      setLoading(false); // ローディング終了
    }
  };

  // レシピ登録
  const handleRecipeSubmit = async () => {
    let categoryText = selectedCategory;
    if (categoryText === "スイーツ") {
      categoryText = "その他";
    }
    postData = {
      recipeName: jsAnswer.recipeName,
      memo: jsAnswer.memo,
      url: null,
      serving: Number(jsAnswer.serving),
      category: categoryText,
      like: 0,
      recipeItemList: jsAnswer.recipeItems,
    };
    console.log("postData:", postData);
    await createRecipeAPI(postData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      console.log("initRecipeData:", initRecipeData);
      setRecipeData(initRecipeData);
    };

    await setRecipeData(getAllRecipe);
    // navigation.navigate("レシピ登録");
    navigation.navigate("レシピリスト");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingDisplayMsg(loadingMessages[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading === true) {
      setLoadingDisplayMsg("");
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>レシピ提案条件</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputArea}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderColor: "gray",
                  borderWidth: 1,
                  padding: 8,
                  marginBottom: 10,
                  borderRadius: 10,
                  fontSize: 16,
                  color: "#444",
                }}
                placeholder="使用したい材料を入力してください"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  handleMessageChange(value);
                }}
              />
            )}
            name="userItem"
          />
        </View>
        <View style={styles.dropDownArea}>
          <SelectDropdown
            data={selectTargetData}
            onSelect={(selectedItem, index) => {
              handleTargetChange(selectedItem);
            }}
            defaultButtonText={selectedTarget}
            buttonTextAfterSelection={(selectedItem, index) => {
              // 選択した後に何の情報を渡すか
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // プルダウンに何の情報を表示するか
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          {/* <Text style={styles.text}>が</Text> */}
          <SelectDropdown
            data={selectFeelingData}
            onSelect={(selectedItem, index) => {
              handleFeelingChange(selectedItem);
            }}
            defaultButtonText={selectedFeeling}
            buttonTextAfterSelection={(selectedItem, index) => {
              // 選択した後に何の情報を渡すか
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // プルダウンに何の情報を表示するか
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        <View style={styles.dropDownArea}>
          <SelectDropdown
            data={selectGenreData}
            onSelect={(selectedItem, index) => {
              handleGenreChange(selectedItem);
            }}
            defaultButtonText={selectedGenre}
            buttonTextAfterSelection={(selectedItem, index) => {
              // 選択した後に何の情報を渡すか
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // プルダウンに何の情報を表示するか
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <SelectDropdown
            data={selectCategoryData}
            onSelect={(selectedItem, index) => {
              handleCategoryChange(selectedItem);
            }}
            defaultButtonText={selectedCategory}
            buttonTextAfterSelection={(selectedItem, index) => {
              // 選択した後に何の情報を渡すか
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // プルダウンに何の情報を表示するか
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        <View style={styles.dropDownArea}>
          <SelectDropdown
            data={selectServingData}
            onSelect={(selectedItem, index) => {
              handleServingChange(selectedItem);
            }}
            defaultButtonText={selectedServing + "人前"}
            buttonTextAfterSelection={(selectedItem, index) => {
              // 選択した後に何の情報を渡すか
              return selectedItem + "人前";
            }}
            rowTextForSelection={(item, index) => {
              // プルダウンに何の情報を表示するか
              return item + "人前";
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>この条件でAIに考えてもらう</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View>
          <Text style={styles.defaultText}>
            {questionText}を考えています...
          </Text>
          <View style={styles.loadingMsgBox}>
            <Text style={styles.defaultText}>{loadingDisplayMsg}</Text>
          </View>
        </View>
      )}
      {answer && (
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>〜 AI's オリジナル レシピ 〜</Text>
          </View>
          <ScrollView>
            <View>
              <Text style={styles.recipeTitle}>{jsAnswer.recipeName}</Text>
              <Text style={styles.recipeLabel}>
                材料　＜{jsAnswer.serving}人前＞
              </Text>
              <View style={styles.recipeText}>
                {jsAnswer.recipeItems && jsAnswer.recipeItems.length > 0 ? (
                  jsAnswer.recipeItems.map((item, index) => (
                    <Text key={index}>
                      {item.recipeItemName}：{item.quantity}
                      {item.unit}
                    </Text>
                  ))
                ) : (
                  <Text>No items found.</Text>
                )}
              </View>
              <Text style={styles.recipeLabel}>作り方</Text>
              <View style={styles.recipeText}>
                {jsAnswer.memo &&
                  jsAnswer.memo
                    .split("\n")
                    .map((line, index) => <Text key={index}>{line}</Text>)}
              </View>
            </View>
          </ScrollView>
          <View style={styles.underBar}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleRecipeSubmit()}
              >
                <Text style={styles.buttonText}>レシピを登録</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0d4", //買い物リストの背景色
    padding: 10,
  },

  inputContainer: {
    // flex: 1,
  },
  loadingMsgBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  defaultText: {
    fontSize: 16,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  inputArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown1BtnStyle: {
    width: "49%",
    height: 35,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 16,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    marginLeft: 18,
    color: "#444",
    textAlign: "left",
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 8,
    backgroundColor: "#b6c471",
    padding: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    margin: 8,
    backgroundColor: "#E6E6E6",
    padding: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleArea: {
    padding: 8,
    backgroundColor: "#B45817",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    marginBottom: 4,
  },
  recipeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 0,
  },
  recipeText: {
    marginTop: 4,
    marginLeft: 24,
  },
  underBar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});
