import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { AddRecipeItem } from "./AddRecipeItem";
import { EditRecipeItem } from "./EditRecipeItem";
import { RecipeItemList } from "./RecipeItemList";
import { AddAiRecipe } from "./AIRecipe/AddAiRecipe";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { table } from "../../../table";
import { useForm, Controller } from "react-hook-form";
import { Rating, AirbnbRating } from "react-native-ratings";
import { createRecipeAPI, fetchRecipeAPI } from "../../boltAPI";

export const AddRecipe = ({ navigation }) => {
  const {
    defaultServing,
    setDefaultServing,
    setRecipeData,
    updateRecipeItem,
    setUpdateRecipeItem,
    displayedRecipes,
    setDisplayedRecipes,
    selectedCategory,
    setSelectedCategory,
  } = useContext(ShareShopDataContext);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipeName: "",
      memo: "",
      serving: defaultServing.toString(),
      url: null,
    },
  });

  const categories = [
    { id: 2, category: "主食" },
    { id: 3, category: "主菜" },
    { id: 4, category: "副菜" },
    { id: 5, category: "汁物" },
    { id: 6, category: "スイーツ" },
    { id: 7, category: "その他" },
  ];

  // const defaultRecipes = table.defaultRecipes;
  const [submitSelectedCategory, setSubmitSelectedCategory] = useState("主食");
  // const [selectedRecipe, setSelectedRecipe] = useState([]);

  // const [serving, setServing] = useState(defaultServing);

  // モーダルのuseState
  const [modalAddRecipeItemVisible, setModalAddRecipeItemVisible] =
    useState(false);
  const [modalEditRecipeItemVisible, setModalEditRecipeItemVisible] =
    useState(false);
  const [recipeItems, setRecipeItems] = useState([]);
  const [addRecipeItemFlag, setAddRecipeItemFlag] = useState(false);

  // レーティングのuseStateと設定
  const [sliderRating, setSliderRating] = useState(0);

  const handleSliderRating = (rating) => {
    setSliderRating(rating);
  };

  //選択されたレシピを献立に登録
  const onSubmit = async (data) => {
    postData = {
      recipeName: data.recipeName,
      memo: data.memo,
      url: data.url,
      serving: Number(data.serving),
      category: submitSelectedCategory,
      like: Number(sliderRating),
      recipeItemList: recipeItems,
    };
    console.log("postData:", postData);

    await createRecipeAPI(postData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      console.log("--------initRecipeData----101---------:", initRecipeData);
      setRecipeData(initRecipeData);
      setDisplayedRecipes(initRecipeData);
      setSelectedCategory("全て");
      // setDisplayedRecipes(
      //   initRecipeData.filter((item) => item.category === "主食")
      // );
    };

    getAllRecipe();
    navigation.navigate("レシピリスト");
  };

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (category) => {
    setSubmitSelectedCategory(category);
    // setDisplayedRecipes(defaultRecipes[categoryId]);
  };

  const handleRemoveRecipeItem = (id) => {
    console.log("id:", id);
    // 選択したレシピの削除
    setRecipeItems((prevData) => prevData.filter((item) => item.id !== id));
  };
  const handleUpdateRecipeItem = async (id) => {
    const updateData = recipeItems.filter((item) => item.id === id);
    console.log("AddRecipe_recipeItems:", updateData);
    await setUpdateRecipeItem(updateData);
    setModalEditRecipeItemVisible(true);
  };

  // useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AI'sレシピ")}
      >
        <Text style={styles.buttonInner}>AIにレシピを考えてもらう🎶</Text>
      </TouchableOpacity>
      {/* カテゴリタブ表時 */}
      <View style={styles.categoryBar}>
        <FlatGrid
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          itemDimension={70} // 要素の幅
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={
                  submitSelectedCategory === item.category
                    ? styles.activeTab
                    : styles.tab
                }
                onPress={() => {
                  handleCategorySelect(item.category);
                  // setSelectedCategoryName(item.category);
                }}
              >
                <Text>{item.category}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View>
        <Text>おすすめ度: {sliderRating}</Text>
        <AirbnbRating
          count={3}
          reviews={["Bad", "OK", "Good"]}
          defaultRating={sliderRating}
          showRating={false}
          size={20}
          onFinishRating={handleSliderRating}
        />
      </View>
      <View>
        <Text style={styles.label}>レシピ名</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="recipeName"
        />
      </View>
      <View>
        <Text>URL</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="url"
        />
      </View>
      <View>
        <Text>メモ</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              multiline={true}
              numberOfLines={5}
              value={value}
            />
          )}
          name="memo"
        />
      </View>
      <View>
        <Text>？人前</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="serving"
        />
      </View>
      <View>
        <Text>食材</Text>
        <Button
          title="食材追加"
          onPress={() => {
            console.log(setModalAddRecipeItemVisible(true));
          }}
          color="mediumseagreen"
        />
        <FlatList
          data={recipeItems}
          renderItem={({ item }) => (
            <RecipeItemList
              item={item}
              // handleCheck={handleCheck}
              // handleRemoveItem={handleRemoveItem}
              recipeItems={recipeItems}
              setRecipeItems={setRecipeItems}
              setAddRecipeItemFlag={setAddRecipeItemFlag}
              setModalEditRecipeItemVisible={setModalEditRecipeItemVisible}
              handleUpdateRecipeItem={handleUpdateRecipeItem}
              handleRemoveRecipeItem={handleRemoveRecipeItem}
              keyExtractor={(item) => item.id}
            />
          )}
        />
        {/* 食材追加モーダル */}
        <Modal
          visible={modalAddRecipeItemVisible}
          animationType="none"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <AddRecipeItem
                recipeItems={recipeItems}
                setRecipeItems={setRecipeItems}
                setAddRecipeItemFlag={setAddRecipeItemFlag}
                setModalAddRecipeItemVisible={setModalAddRecipeItemVisible}
              />
            </View>
          </View>
        </Modal>

        {/* 食材編集モーダル */}
        <Modal
          visible={modalEditRecipeItemVisible}
          animationType="none"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <EditRecipeItem
                recipeItems={recipeItems}
                setRecipeItems={setRecipeItems}
                setModalEditRecipeItemVisible={setModalEditRecipeItemVisible}
              />
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonInner}>レシピを登録</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  categoryBar: {
    flex: 0.85,
    // height: 95,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
  },
  tab: {
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "#B6C471",
    borderRightColor: "#B6C471",
    borderTopColor: "#B6C471",
    // justifyContent: "center",
  },
  activeTab: {
    padding: 5,
    backgroundColor: "#B6C471",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#B6C471",
    borderLeftColor: "#B6C471",
    borderRightColor: "#B6C471",
    borderTopColor: "#B6C471",
    // justifyContent: "center",
  },
  recipeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 6,
    borderRadius: 20,
  },
  recipeText: {
    fontSize: 12,
  },
  selectedRecipeContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 10,
    height: 300,
    width: "100%",
  },
  selectedRecipeTab: {
    height: 30,
    width: "100%",
    backgroundColor: "mediumseagreen",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    // borderRadius: 20,
  },
  selectedRecipeTabText: {
    fontSize: 17,
  },
  selectedRecipeTabTextSmall: {
    fontSize: 14,
    // backgroundColor: "white",
    justifyContent: "center",
    padding: 5,
    // color: "white",
    // height: 30,
    // backgroundColor: "mediumseagreen",
    // width: "30%",
  },
  box: {
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderBottomColor: "mediumseagreen",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderTopColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 10,
  },
  innerBox: {
    flex: 1,
    // backgroundColor: "steelblue",
    padding: 3,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  recipeBox: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 1,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: 40,
    backgroundColor: "mediumseagreen",
    borderRadius: 20,
    width: "50%",
    marginLeft: "25%",
  },

  label: {
    // color: "white",
    margin: 20,
    marginLeft: 0,
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  alertFont: {
    color: "red",
  },
};
