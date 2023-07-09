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
  ScrollView,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { MaterialIcons } from "@expo/vector-icons";
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
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    defaultServing,
    setDefaultServing,
    setRecipeData,
    updateRecipeItem,
    setUpdateRecipeItem,
    displayedRecipes,
    setDisplayedRecipes,
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
    { id: 1, category: "主食" },
    { id: 2, category: "主菜" },
    { id: 3, category: "副菜" },
    { id: 4, category: "汁物" },
    { id: 5, category: "その他" },
  ];

  // const defaultRecipes = table.defaultRecipes;
  const [selectedCategory, setSelectedCategory] = useState("主菜");
  // const [selectedCategoryName, setSelectedCategoryName] = useState("主食");
  const [selectedRecipe, setSelectedRecipe] = useState([]);

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
      category: selectedCategory,
      like: Number(sliderRating),
      recipeItemList: recipeItems,
    };
    console.log("postData:", postData);

    await createRecipeAPI(postData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      setRecipeData(initRecipeData);
      // setDisplayedRecipes(
      //   initRecipeData.filter((item) => item.category === "主食")
      // );
    };

    getAllRecipe();
    navigation.navigate("レシピリスト");
  };

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (id, category) => {
    setSelectedCategory(category);
  };

  //選択した食材を削除（フィルターで非表示）
  const handleRemoveRecipeItem = (id) => {
    setRecipeItems((prevData) => prevData.filter((item) => item.id !== id));
  };

  // 選択した食材の更新画面へ遷移
  const handleUpdateRecipeItem = async (id) => {
    const updateData = recipeItems.filter((item) => item.id === id);
    await setUpdateRecipeItem(updateData);
    setModalEditRecipeItemVisible(true);
  };

  useEffect(() => {}, []);

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
          size={16}
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
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="recipeName"
            />
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
      <TouchableOpacity style={styles.recipeItemAddButton}>
        <MaterialIcons
          onPress={() => {
            console.log(setModalAddRecipeItemVisible(true));
          }}
          name="add-circle-outline"
          size={35}
          color="#B45817"
        />
      </TouchableOpacity>
      <View style={styles.underBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AI'sレシピ")}
        >
          <Text style={styles.buttonText}>AIにレシピを考えてもらう</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>レシピを登録</Text>
        </TouchableOpacity>
      </View>

      {/* ここからモーダル関係 */}
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
    fontSize: 16,
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
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 8,
  },

  // underBar: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   padding: 10,
  //   alignItems: "center",
  //   marginBottom: 10,
  //   marginRight: 10,
  //   marginLeft: 10,
  //   marginTop: 10,
  // },
  //ここまでok

  // box: {
  //   width: "100%",
  //   height: 30,
  //   borderWidth: 1,
  //   borderBottomColor: "mediumseagreen",
  //   borderLeftColor: "rgba(0,0,0,0)",
  //   borderRightColor: "rgba(0,0,0,0)",
  //   borderTopColor: "rgba(0,0,0,0)",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  //   // backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   marginTop: 10,
  // },
  // innerBox: {
  //   flex: 1,
  //   // backgroundColor: "steelblue",
  //   padding: 3,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   flexDirection: "row",
  // },
  // recipeBox: {
  //   width: "65%",
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

  alertFont: {
    color: "red",
  },
});
