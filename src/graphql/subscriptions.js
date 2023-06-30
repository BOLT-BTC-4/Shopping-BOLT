/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop(
    $filter: ModelSubscriptionShopFilterInput
    $owner: String
  ) {
    onCreateShop(filter: $filter, owner: $owner) {
      id
      shop
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop(
    $filter: ModelSubscriptionShopFilterInput
    $owner: String
  ) {
    onUpdateShop(filter: $filter, owner: $owner) {
      id
      shop
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop(
    $filter: ModelSubscriptionShopFilterInput
    $owner: String
  ) {
    onDeleteShop(filter: $filter, owner: $owner) {
      id
      shop
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateShoppingList = /* GraphQL */ `
  subscription OnCreateShoppingList(
    $filter: ModelSubscriptionShoppingListFilterInput
    $owner: String
  ) {
    onCreateShoppingList(filter: $filter, owner: $owner) {
      id
      item
      unit
      quantity
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateShoppingList = /* GraphQL */ `
  subscription OnUpdateShoppingList(
    $filter: ModelSubscriptionShoppingListFilterInput
    $owner: String
  ) {
    onUpdateShoppingList(filter: $filter, owner: $owner) {
      id
      item
      unit
      quantity
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteShoppingList = /* GraphQL */ `
  subscription OnDeleteShoppingList(
    $filter: ModelSubscriptionShoppingListFilterInput
    $owner: String
  ) {
    onDeleteShoppingList(filter: $filter, owner: $owner) {
      id
      item
      unit
      quantity
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateMenu = /* GraphQL */ `
  subscription OnCreateMenu(
    $filter: ModelSubscriptionMenuFilterInput
    $owner: String
  ) {
    onCreateMenu(filter: $filter, owner: $owner) {
      id
      date
      recipes {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateMenu = /* GraphQL */ `
  subscription OnUpdateMenu(
    $filter: ModelSubscriptionMenuFilterInput
    $owner: String
  ) {
    onUpdateMenu(filter: $filter, owner: $owner) {
      id
      date
      recipes {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteMenu = /* GraphQL */ `
  subscription OnDeleteMenu(
    $filter: ModelSubscriptionMenuFilterInput
    $owner: String
  ) {
    onDeleteMenu(filter: $filter, owner: $owner) {
      id
      date
      recipes {
        items {
          id
          menuId
          recipeId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem(
    $filter: ModelSubscriptionItemFilterInput
    $owner: String
  ) {
    onCreateItem(filter: $filter, owner: $owner) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem(
    $filter: ModelSubscriptionItemFilterInput
    $owner: String
  ) {
    onUpdateItem(filter: $filter, owner: $owner) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem(
    $filter: ModelSubscriptionItemFilterInput
    $owner: String
  ) {
    onDeleteItem(filter: $filter, owner: $owner) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateItemPreset = /* GraphQL */ `
  subscription OnCreateItemPreset(
    $filter: ModelSubscriptionItemPresetFilterInput
  ) {
    onCreateItemPreset(filter: $filter) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateItemPreset = /* GraphQL */ `
  subscription OnUpdateItemPreset(
    $filter: ModelSubscriptionItemPresetFilterInput
  ) {
    onUpdateItemPreset(filter: $filter) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteItemPreset = /* GraphQL */ `
  subscription OnDeleteItemPreset(
    $filter: ModelSubscriptionItemPresetFilterInput
  ) {
    onDeleteItemPreset(filter: $filter) {
      id
      item
      unit
      corner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateRecipeItem = /* GraphQL */ `
  subscription OnCreateRecipeItem(
    $filter: ModelSubscriptionRecipeItemFilterInput
    $owner: String
  ) {
    onCreateRecipeItem(filter: $filter, owner: $owner) {
      id
      recipeItem
      quantity
      corner
      recipeID
      unit
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateRecipeItem = /* GraphQL */ `
  subscription OnUpdateRecipeItem(
    $filter: ModelSubscriptionRecipeItemFilterInput
    $owner: String
  ) {
    onUpdateRecipeItem(filter: $filter, owner: $owner) {
      id
      recipeItem
      quantity
      corner
      recipeID
      unit
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteRecipeItem = /* GraphQL */ `
  subscription OnDeleteRecipeItem(
    $filter: ModelSubscriptionRecipeItemFilterInput
    $owner: String
  ) {
    onDeleteRecipeItem(filter: $filter, owner: $owner) {
      id
      recipeItem
      quantity
      corner
      recipeID
      unit
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onCreateRecipe(filter: $filter, owner: $owner) {
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
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onUpdateRecipe(filter: $filter, owner: $owner) {
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
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onDeleteRecipe(filter: $filter, owner: $owner) {
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
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
          owner
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onCreateRecipeMenu = /* GraphQL */ `
  subscription OnCreateRecipeMenu(
    $filter: ModelSubscriptionRecipeMenuFilterInput
    $owner: String
  ) {
    onCreateRecipeMenu(filter: $filter, owner: $owner) {
      id
      menuId
      recipeId
      menu {
        id
        date
        recipes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          startedAt
          __typename
        }
        RecipeItems {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateRecipeMenu = /* GraphQL */ `
  subscription OnUpdateRecipeMenu(
    $filter: ModelSubscriptionRecipeMenuFilterInput
    $owner: String
  ) {
    onUpdateRecipeMenu(filter: $filter, owner: $owner) {
      id
      menuId
      recipeId
      menu {
        id
        date
        recipes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          startedAt
          __typename
        }
        RecipeItems {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteRecipeMenu = /* GraphQL */ `
  subscription OnDeleteRecipeMenu(
    $filter: ModelSubscriptionRecipeMenuFilterInput
    $owner: String
  ) {
    onDeleteRecipeMenu(filter: $filter, owner: $owner) {
      id
      menuId
      recipeId
      menu {
        id
        date
        recipes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          startedAt
          __typename
        }
        RecipeItems {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
