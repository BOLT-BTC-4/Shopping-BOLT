import React, { useContext, useState } from "react";
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
import { RecipeItemList } from "./RecipeItemList";
import { ShareShopDataContext } from "../../screen/ShareShopDataContext";
import { table } from "../../../table";
import { useForm, Controller } from "react-hook-form";
import { Rating, AirbnbRating } from "react-native-ratings";
import { createRecipeAPI, fetchRecipeAPI } from "../../boltAPI";

export const EditRecipe = ({ navigation }) => {
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

  const categories = [
    { id: 1, categry1: "主食" },
    { id: 2, categry1: "主菜" },
    { id: 3, categry1: "副菜" },
    { id: 4, categry1: "汁物" },
    { id: 5, categry1: "その他" },
  ];

  const testDataRecipeItems = [
    { id: 1, itemName: "にんじん", quantity: "1", unit: "個" },
    { id: 2, itemName: "じゃがいも", quantity: "1", unit: "個" },
  ];

  const defaultRecipes = table.defaultRecipes;
  const {
    selectedDay,
    setSelectedDay,
    menu,
    setMenu,
    defaultServing,
    setDefaultServing,
  } = useContext(ShareShopDataContext);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedCategoryName, setSelectedCategoryName] = useState("主食");
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState(
    defaultRecipes[selectedCategory]
  );
  const [serving, setServing] = useState(defaultServing);
  const { recipeData, setRecipeData } = useContext(ShareShopDataContext);

  // モーダルのuseState
  const [modalAddRecipeItemVisible, setModalAddRecipeItemVisible] =
    useState(false);
  const [recipeItems, setRecipeItems] = useState(testDataRecipeItems);
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
      category: selectedCategoryName,
      like: Number(sliderRating),
    };
    console.log("postData:", postData);

    await createRecipeAPI(postData);

    // レシピの一覧を取得
    const getAllRecipe = async () => {
      const initRecipeData = await fetchRecipeAPI();
      console.log("initRecipeData:", initRecipeData);
      setRecipeData(initRecipeData);
    };

    setRecipeData(getAllRecipe);
    navigation.navigate("レシピリスト");

    // const shop = {
    //   shopName: data.shopName,
    //   corner: corner,
    // };
    // await createShopAPI(shop);

    // const newSelectedRecipe = [...selectedRecipe];
    // // Servingの数をselectedRecipeのitemsのquantityに掛ける　（recipeのquantityは１人前の分量が登録されている想定）
    // newSelectedRecipe.forEach((recipe, indexOut) => {
    //   recipe.items.forEach((item, index) => {
    //     console.log("////////////////////////////////////", recipe.serving);
    //     newSelectedRecipe[indexOut].items[index].quantity =
    //       item.quantity * recipe.serving;
    //   });
    // });
    // console.log("changeQuantityItems!!!!!!!!!!!:", newSelectedRecipe[0].items);
    // const newMenu = {
    //   ...menu,
    //   [selectedDay]: newSelectedRecipe,
    // };
    // "newmenu", newMenu;
    // setMenu(newMenu);
    // navigation.navigate("献立リスト");
  };

  //カテゴリが選択されたらそのカテゴリに該当するレシピを表示
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setDisplayedRecipes(defaultRecipes[categoryId]);
  };
  //レシピを選択したらそのレシピ情報を引数に取ってsetSelectedRecipeに追加
  const handleRecipeSelect = (recipe) => {
    const deepCopyRecipe = JSON.parse(JSON.stringify(recipe));
    setSelectedRecipe((recipes) => [
      ...recipes,
      {
        recipeId: deepCopyRecipe.recipeId,
        categry1: deepCopyRecipe.categry1,
        recipe: deepCopyRecipe.recipe,
        url: deepCopyRecipe.url,
        serving: defaultServing,
        like: deepCopyRecipe.like,
        items: deepCopyRecipe.items,
      },
    ]);
    // 要素をレシピ表示配列から削除する
    setDisplayedRecipes((prevRecipes) =>
      prevRecipes.filter(
        (prevRecipe) => prevRecipe.recipeId !== deepCopyRecipe.recipeId
      )
    );
  };

  const handleChangeServing = (parmRecipeId, num) => {
    const newSelectedRecipe = [...selectedRecipe];
    const copySelectedRecipe = newSelectedRecipe.find(
      (recipe) => recipe.recipeId === parmRecipeId
    );
    copySelectedRecipe.serving = copySelectedRecipe.serving + num;
    setSelectedRecipe(newSelectedRecipe);
  };

  //レンダリング↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //カテゴリタブ表示
  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={selectedCategory === item.id ? styles.activeTab : styles.tab}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Text>{item.categry1}</Text>
    </TouchableOpacity>
  );

  //最初にレンダーされる
  return (
    <View style={styles.container}>
      <FlatGrid
        data={categories}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={
                selectedCategory === item.id ? styles.activeTab : styles.tab
              }
              onPress={() => {
                handleCategorySelect(item.id);
                setSelectedCategoryName(item.categry1);
              }}
            >
              <Text>{item.categry1}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        itemDimension={60} // 要素の幅
      />
      <View>
        {/* <Text>評価: {starRating}</Text>
        <Rating
          showRating
          onFinishRating={handleStarRating}
          style={{ paddingVertical: 10 }}
        /> */}
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
            />
          )}
          keyExtractor={(item, index) => index.toString()}
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
