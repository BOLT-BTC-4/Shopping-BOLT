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
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { table } from "../../../table";
import { useForm, Controller } from "react-hook-form";
import { Rating, AirbnbRating } from "react-native-ratings";
import { updateRecipeAPI, fetchRecipeAPI } from "../../boltAPI";

export const EditRecipe = ({ navigation }) => {
  const categories = [
    { id: 1, category: "主食" },
    { id: 2, category: "主菜" },
    { id: 3, category: "副菜" },
    { id: 4, category: "汁物" },
    { id: 5, category: "その他" },
  ];

  const defaultRecipes = table.defaultRecipes;
  const {
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    defaultServing,
    setDefaultServing,
    setRecipeData,
    updateRecipeItem,
    setUpdateRecipeItem,
    updateRecipe,
    setUpdateRecipe,
  } = useContext(ShareShopDataContext);
  const [selectedCategory, setSelectedCategory] = useState("主食");
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState(
    defaultRecipes[selectedCategory]
  );

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  console.log("EditRecipe_updateRecipe", updateRecipe);
  console.log("EditRecipe_updateRecipeItem", updateRecipeItem);

  // モーダルのuseState
  const [modalAddRecipeItemVisible, setModalAddRecipeItemVisible] =
    useState(false);
  const [modalEditRecipeItemVisible, setModalEditRecipeItemVisible] =
    useState(false);
  const [recipeItems, setRecipeItems] = useState(updateRecipeItem);
  const [addRecipeItemFlag, setAddRecipeItemFlag] = useState(false);

  const initializeForm = () => {
    let updateRecipeItemCheck = false;
    if (updateRecipeItem.length !== 0) {
      updateRecipeItemCheck = true;
    }
    if (updateRecipeItemCheck) {
      // updateRecipe.itemsまたはupdateRecipeItemが１つ以上登録されている時
      setValue("recipeName", updateRecipe.recipeName);
      setValue("url", updateRecipe.url);
      setValue("memo", updateRecipe.memo);
      setValue("serving", String(updateRecipe.serving));
      setSliderRating(updateRecipe.like);
      setSelectedCategory(updateRecipe.category);
      setValue("quantity", String(updateRecipeItem[0].quantity)); // TextInputが文字列しか参照できないため文字列型にしている
      setValue("unit", updateRecipeItem[0].unit);
      setValue("recipeItemName", updateRecipeItem[0].recipeItemName);
      setValue("quantity", String(updateRecipeItem[0].quantity)); // TextInputが文字列しか参照できないため文字列型にしている
      setValue("unit", updateRecipeItem[0].unit);
    } else {
      // updateRecipe.itemsまたはupdateRecipeItemが空の時
      setValue("recipeName", updateRecipe.recipeName);
      setValue("url", updateRecipe.url);
      setValue("memo", updateRecipe.memo);
      setValue("serving", String(updateRecipe.serving));
      setSliderRating(updateRecipe.like);
      setSelectedCategory(updateRecipe.category);
    }
  };

  // const [serving, setServing] = useState(defaultServing);

  // レーティングのuseStateと設定
  const [sliderRating, setSliderRating] = useState(0);

  const handleSliderRating = (rating) => {
    setSliderRating(rating);
  };

  //選択されたレシピを献立に登録
  const onSubmit = async (data) => {
    console.log("EditRecipe_data:", data);
    console.log("EditRecipe_updateRecipe[0].recipeID:", updateRecipe.id);
    updateData = {
      recipeID: updateRecipe.id,
      recipeName: data.recipeName,
      memo: data.memo,
      url: data.url,
      serving: Number(data.serving),
      category: selectedCategory,
      like: Number(sliderRating),
      recipeItemList: recipeItems,
    };
    console.log("EditRecipe_updateData:", updateData);

    await updateRecipeAPI(updateData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      console.log("initRecipeData:", initRecipeData);
      setRecipeData(initRecipeData);
    };

    await setRecipeData(getAllRecipe);
    navigation.navigate("レシピリスト");
  };

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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

  useEffect(() => {
    initializeForm();
  }, []);

  return (
    <View style={styles.container}>
      <FlatGrid
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        itemDimension={60} // 要素の幅
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={
                selectedCategory === item.category
                  ? styles.activeTab
                  : styles.tab
              }
              onPress={() => {
                handleCategorySelect(item.category);
              }}
            >
              <Text>{item.category}</Text>
            </TouchableOpacity>
          );
        }}
      />
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
            setModalAddRecipeItemVisible(true);
          }}
          color="mediumseagreen"
        />
        <FlatList
          data={recipeItems}
          renderItem={({ item }) => (
            <RecipeItemList
              item={item}
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
        <Text style={styles.buttonInner}>レシピを更新</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
