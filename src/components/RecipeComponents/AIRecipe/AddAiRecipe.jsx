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
import { RecipeList } from "../RecipeList";

export const AddAiRecipe = ({ navigation }) => {
  const {
    selectTargetData,
    selectFeelingData,
    selectGenreData,
    selectCategoryData,
    selectServingData,
  } = selectData;

  const {
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

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

  const [tmpCheck, setTmpCheck] = useState("");

  const handleSubmit = async () => {
    setAnswer(false);
    console.log("Chat-GPTに考えてもらっています");

    // 入力値の取得
    // const selectedIngredient = message;
    const userInputItemText = userInputItem;
    const selectedTargetText = selectedTarget;
    const selectedFeelingText = selectedFeeling;
    const selectedGenreText = selectedGenre;
    const selectedCategoryText = selectedCategory;
    const selectedServingText = selectedServing;

    // 文章の組み立て
    const displayText = `${userInputItemText}を使った、${selectedTargetText}が${selectedFeelingText}、${selectedGenreText}${selectedCategoryText}のレシピ、${selectedServingText}人前`;
    const generatedText = `${displayText}を教えてください。①レシピ名、②食材、③分量、④単位、⑤つくり方を教えて下さい。作り方は、工程ごとで区切って教えてください。必ず分量と単位は分けてください。分量には文字を入れず単位に文字を入れてください。①から⑤の情報をJavaScriptで利用できるように下記の配列とオブジェクトのフォーマットで、必ずJSON形式で回答をしてください。
    {
      recipeName:①レシピ名,
      serving:1,
      recipeItems:[{ recipeItemName: ②食材, quantity: ③分量, unit: ④単位 },{ itemName: ②食材, quantity: ③分量, unit: ④単位 },...],
      memo:⑤作り方,
    }`;
    setQuestionText(displayText);
    setTmpCheck(generatedText);

    try {
      // Chat.jsx にメッセージを渡して API から回答を取得
      const responseText = await Chat(generatedText);
      console.log("レシピを思いつきました！");

      // エラーが発生しなかった場合の処理
      console.log("isJSON:", isJSON(responseText));
      console.log(responseText);
      function isJSON(str) {
        try {
          JSON.parse(str);
          return true;
        } catch (error) {
          return false;
        }
      }
      if (isJSON(responseText)) {
        // 回答の格納
        setAnswer(responseText);

        const jsData = JSON.parse(responseText);
        console.log("jsData.recipeName:", jsData.recipeName);
        console.log("jsData.recipeItems:", jsData.recipeItems);
        console.log("jsData:", jsData);
        setJSAnswer(jsData);
      } else {
        alert(
          `頭がパンクしました○|￣|＿\n少し休憩が必要です\nしばらく経ってから\nもう一度実行してください`
        );
      }
    } catch (error) {
      // エラーが発生した場合の処理
      alert("エラーが発生しました\nもう一度実行してください: " + error.message);
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

  useEffect(() => {}, []);
  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
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
      <Text>を使って</Text>
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
      />
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
      />
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
      />
      <SelectDropdown
        data={selectServingData}
        onSelect={(selectedItem, index) => {
          handleServingChange(selectedItem);
        }}
        defaultButtonText={selectedServing}
        buttonTextAfterSelection={(selectedItem, index) => {
          // 選択した後に何の情報を渡すか
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // プルダウンに何の情報を表示するか
          return item;
        }}
      />
      <Button title="考えてもらう" onPress={handleSubmit} />
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          考えるレシピ内容:
        </Text>
        <Text>{questionText}</Text>
      </View>
      {answer && (
        <ScrollView>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              〜 AI オリジナル レシピ 〜
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              レシピ名：{jsAnswer.recipeName}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              材料：{jsAnswer.serving}人前
            </Text>
            <View>
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>作り方：</Text>
            <Text>
              {jsAnswer.memo &&
                jsAnswer.memo.split("\n").map((line, index) => (
                  <Text key={index}>
                    {line}
                    {"\n"}
                  </Text>
                ))}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleRecipeSubmit()}
            >
              <Text style={styles.button}>レシピを登録</Text>
            </TouchableOpacity>
          </View>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>改行</Text>
          <Text>{tmpCheck}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
  },
});
