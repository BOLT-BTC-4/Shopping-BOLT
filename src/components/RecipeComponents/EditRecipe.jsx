import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { MaterialIcons } from "@expo/vector-icons";
import { AddRecipeItem } from "./AddRecipeItem";
import { EditRecipeItem } from "./EditRecipeItem";
import { RecipeItemList } from "./RecipeItemList";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { table } from "../../../table";
import { useForm, Controller } from "react-hook-form";
import { Rating, AirbnbRating } from "react-native-ratings";
import { updateRecipeAPI, fetchRecipeAPI } from "../../boltAPI";

export const EditRecipe = ({ navigation }) => {
  console.log("===== comp_EditRecipe =====");
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

  // console.log("EditRecipe_updateRecipe", updateRecipe);
  // console.log("EditRecipe_updateRecipeItem", updateRecipeItem);

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
    // console.log("EditRecipe_data:", data);
    // console.log("EditRecipe_updateRecipe[0].recipeID:", updateRecipe.id);
    const updateData = {
      recipeID: updateRecipe.id,
      recipeName: data.recipeName,
      memo: data.memo,
      url: data.url,
      serving: Number(data.serving),
      category: selectedCategory,
      like: Number(sliderRating),
      recipeItemList: recipeItems,
    };
    // console.log("EditRecipe_updateData:", updateData);

    await updateRecipeAPI(updateData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      // console.log("initRecipeData:", initRecipeData);
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
    // console.log("id:", id);
    // 選択したレシピの削除
    setRecipeItems((prevData) => prevData.filter((item) => item.id !== id));
  };
  const handleUpdateRecipeItem = async (id) => {
    const updateData = recipeItems.filter((item) => item.id === id);
    // console.log("AddRecipe_recipeItems:", updateData);
    await setUpdateRecipeItem(updateData);
    setModalEditRecipeItemVisible(true);
  };

  useEffect(() => {
    initializeForm();
  }, []);

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <>
      <TouchableOpacity
        style={
          selectedCategory === item.category ? styles.activeTab : styles.tab
        }
        onPress={() => handleCategorySelect(item.id, item.category)}
      >
        <Text
          style={
            selectedCategory === item.category
              ? styles.activeTabText
              : styles.tabText
          }
        >
          {item.category}
        </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatGrid
          data={categories}
          renderItem={renderCategoryTab}
          keyExtractor={(item) => item.id.toString()}
          itemDimension={60} // 要素の幅
        />
      </View>
      <View style={styles.recipeLikeContainer}>
        <Text style={styles.likeText}>評価：</Text>
        <AirbnbRating
          count={3}
          defaultRating={sliderRating}
          showRating={false}
          size={24}
          onFinishRating={handleSliderRating}
        />
      </View>
      <View style={styles.recipeContainerColumn}>
        <Text style={styles.label}>レシピ名</Text>
        <View style={styles.recipeNameContainer}>
          <View style={styles.inputNameArea}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="レシピ名を入力してください"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="recipeName"
              rules={{ required: true }}
            />
            {errors.recipeName && (
              <Text style={styles.alertFont}>レシピ名を入力してください</Text>
            )}
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputServing}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="serving"
          />
          <Text style={styles.label}>人前</Text>
        </View>
      </View>
      <View style={styles.recipeContainerColumn}>
        <Text style={styles.label}>URL</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="https://"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="url"
        />
      </View>
      <View style={styles.recipeContainerColumn}>
        <Text style={styles.label}>メモ</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputArea}
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
      <Text style={styles.labelItem}>材料</Text>
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
      <TouchableOpacity style={styles.recipeItemAddButton}>
        <MaterialIcons
          onPress={() => {
            setModalAddRecipeItemVisible(true);
          }}
          name="add-circle-outline"
          size={35}
          color="#B45817"
        />
      </TouchableOpacity>
      <View style={styles.underBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>レシピを更新</Text>
        </TouchableOpacity>
      </View>

      {/* ここからモーダル関係 */}
      {/* 材料追加モーダル */}
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

      {/* 材料編集モーダル */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0D4",
    padding: 10,
  },

  defaultText: {
    fontSize: 16,
  },

  likeText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 8,
    backgroundColor: "#b6c471",
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  tab: {
    padding: 10,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    padding: 10,
    backgroundColor: "#B45817",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    color: "#855E3D",
    fontWeight: "bold",
  },

  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },

  recipeLikeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },

  recipeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  recipeItemContainer: {
    height: 300,
  },

  recipeContainerColumn: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 4,
    padding: 6,
    borderRadius: 20,
  },

  recipeText: {
    fontSize: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelItem: {
    paddingLeft: 6,
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    // height: 40,
    padding: 8,
    borderRadius: 4,
  },

  inputNameArea: {
    flex: 1,
  },
  inputServing: {
    marginLeft: 8,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    width: 40,
    padding: 8,
    borderRadius: 4,
  },

  inputArea: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    height: 65,
    padding: 8,
    borderRadius: 4,
  },
  recipeItemAddButton: {
    alignItems: "flex-end",
    marginRight: 25,
    marginHorizontal: "3%",
  },

  underBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 8,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContents: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  alertFont: {
    color: "red",
  },
});
