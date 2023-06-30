/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShop = /* GraphQL */ `
  mutation CreateShop(
    $input: CreateShopInput!
    $condition: ModelShopConditionInput
  ) {
    createShop(input: $input, condition: $condition) {
      id
      shop
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateShop = /* GraphQL */ `
  mutation UpdateShop(
    $input: UpdateShopInput!
    $condition: ModelShopConditionInput
  ) {
    updateShop(input: $input, condition: $condition) {
      id
      shop
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteShop = /* GraphQL */ `
  mutation DeleteShop(
    $input: DeleteShopInput!
    $condition: ModelShopConditionInput
  ) {
    deleteShop(input: $input, condition: $condition) {
      id
      shop
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createShoppingList = /* GraphQL */ `
  mutation CreateShoppingList(
    $input: CreateShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    createShoppingList(input: $input, condition: $condition) {
      id
      item
      unit
      quantity
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateShoppingList = /* GraphQL */ `
  mutation UpdateShoppingList(
    $input: UpdateShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    updateShoppingList(input: $input, condition: $condition) {
      id
      item
      unit
      quantity
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteShoppingList = /* GraphQL */ `
  mutation DeleteShoppingList(
    $input: DeleteShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    deleteShoppingList(input: $input, condition: $condition) {
      id
      item
      unit
      quantity
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createMenu = /* GraphQL */ `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
      id
      date
      recipes {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
      id
      date
      recipes {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
      id
      date
      recipes {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createItemPreset = /* GraphQL */ `
  mutation CreateItemPreset(
    $input: CreateItemPresetInput!
    $condition: ModelItemPresetConditionInput
  ) {
    createItemPreset(input: $input, condition: $condition) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateItemPreset = /* GraphQL */ `
  mutation UpdateItemPreset(
    $input: UpdateItemPresetInput!
    $condition: ModelItemPresetConditionInput
  ) {
    updateItemPreset(input: $input, condition: $condition) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteItemPreset = /* GraphQL */ `
  mutation DeleteItemPreset(
    $input: DeleteItemPresetInput!
    $condition: ModelItemPresetConditionInput
  ) {
    deleteItemPreset(input: $input, condition: $condition) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRecipeItem = /* GraphQL */ `
  mutation CreateRecipeItem(
    $input: CreateRecipeItemInput!
    $condition: ModelRecipeItemConditionInput
  ) {
    createRecipeItem(input: $input, condition: $condition) {
      id
      recipeItem
      quantity
      corner
      recipeID
      unit
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRecipeItem = /* GraphQL */ `
  mutation UpdateRecipeItem(
    $input: UpdateRecipeItemInput!
    $condition: ModelRecipeItemConditionInput
  ) {
    updateRecipeItem(input: $input, condition: $condition) {
      id
      recipeItem
      quantity
      corner
      recipeID
      unit
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRecipeItem = /* GraphQL */ `
  mutation DeleteRecipeItem(
    $input: DeleteRecipeItemInput!
    $condition: ModelRecipeItemConditionInput
  ) {
    deleteRecipeItem(input: $input, condition: $condition) {
      id
      recipeItem
      quantity
      corner
      recipeID
      unit
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
      id
      recipe
      memo
      url
      serving
      category1
      category2
      like
      Menus {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      RecipeItems {
        items {
          id
          recipeItem
          quantity
          corner
          recipeID
          unit
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
      id
      recipe
      memo
      url
      serving
      category1
      category2
      like
      Menus {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      RecipeItems {
        items {
          id
          recipeItem
          quantity
          corner
          recipeID
          unit
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
      id
      recipe
      memo
      url
      serving
      category1
      category2
      like
      Menus {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      RecipeItems {
        items {
          id
          recipeItem
          quantity
          corner
          recipeID
          unit
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createRecipeMenu = /* GraphQL */ `
  mutation CreateRecipeMenu(
    $input: CreateRecipeMenuInput!
    $condition: ModelRecipeMenuConditionInput
  ) {
    createRecipeMenu(input: $input, condition: $condition) {
      id
      menuId
      recipeId
      menu {
        id
        date
        recipes {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      recipe {
        id
        recipe
        memo
        url
        serving
        category1
        category2
        like
        Menus {
          nextToken
          __typename
        }
        RecipeItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRecipeMenu = /* GraphQL */ `
  mutation UpdateRecipeMenu(
    $input: UpdateRecipeMenuInput!
    $condition: ModelRecipeMenuConditionInput
  ) {
    updateRecipeMenu(input: $input, condition: $condition) {
      id
      menuId
      recipeId
      menu {
        id
        date
        recipes {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      recipe {
        id
        recipe
        memo
        url
        serving
        category1
        category2
        like
        Menus {
          nextToken
          __typename
        }
        RecipeItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRecipeMenu = /* GraphQL */ `
  mutation DeleteRecipeMenu(
    $input: DeleteRecipeMenuInput!
    $condition: ModelRecipeMenuConditionInput
  ) {
    deleteRecipeMenu(input: $input, condition: $condition) {
      id
      menuId
      recipeId
      menu {
        id
        date
        recipes {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      recipe {
        id
        recipe
        memo
        url
        serving
        category1
        category2
        like
        Menus {
          nextToken
          __typename
        }
        RecipeItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
