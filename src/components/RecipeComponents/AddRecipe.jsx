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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

export const AddRecipe = ({ navigation }) => {
  console.log("===== comp_AddRecipe =====");
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
      url: null,
    },
  });

  const selectCategoryData = [
    "主食",
    "主菜",
    "副菜",
    "汁物",
    "スイーツ",
    "その他",
  ];

  const selectServingData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // const defaultRecipes = table.defaultRecipes;
  const [selectedCategoryAdd, setSelectedCategoryAdd] = useState("主菜");
  const [selectedServing, setSelectedServing] = useState(4);

  // モーダルのuseState
  const [modalAddRecipeItemVisible, setModalAddRecipeItemVisible] =
    useState(false);
  const [modalEditRecipeItemVisible, setModalEditRecipeItemVisible] =
    useState(false);
  const [recipeItems, setRecipeItems] = useState([]);
  const [addRecipeItemFlag, setAddRecipeItemFlag] = useState(false);

  // レーティングのuseStateと設定
  const [sliderRating, setSliderRating] = useState(0);

  const handleCategoryChange = (value) => {
    setSelectedCategoryAdd(value);
  };

  const handleServingChange = (value) => {
    setSelectedServing(value);
  };

  const handleSliderRating = (rating) => {
    setSliderRating(rating);
  };

  //選択されたレシピを献立に登録
  const onSubmit = async (data) => {
    console.log("data:", data);
    postData = {
      recipeName: data.recipeName,
      memo: data.memo,
      url: data.url,
      serving: Number(selectedServing),
      category: selectedCategoryAdd,
      like: Number(sliderRating),
      recipeItemList: recipeItems,
    };
    // console.log("postData:", postData);

    await createRecipeAPI(postData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      setRecipeData(initRecipeData);
      setDisplayedRecipes(initRecipeData);
      setSelectedCategory("全て");
    };

    await getAllRecipe();
    navigation.navigate("レシピリスト");
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

  return (
    <View style={styles.container}>
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

          <SelectDropdown
            data={selectCategoryData}
            onSelect={(selectedItem, index) => {
              handleCategoryChange(selectedItem);
            }}
            defaultButtonText={selectedCategoryAdd}
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
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

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
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
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

      <View style={styles.underBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>レシピを登録</Text>
        </TouchableOpacity>
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
  categoryContainer: {
    margin: 0,
    padding: 0,
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
    // padding: 6,
  },

  recipeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    padding: 4,
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
    padding: 4,
    borderRadius: 4,
  },

  inputArea: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    height: 50,
    padding: 4,
    borderRadius: 4,
  },
  recipeItemAddButton: {
    alignItems: "flex-end",
  },

  underBar: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: 8,
    flexDirection: "row",
    height: 60,
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 5,
    marginHorizontal: "10%",
    marginTop: 1,
    backgroundColor: "red",
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

  //ドロップダウンリストのスタイル
  dropDownArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown1BtnStyle: {
    width: 80,
    height: 27,
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 12,
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
    fontSize: 12,
  },
});
