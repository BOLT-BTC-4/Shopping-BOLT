/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShop = /* GraphQL */ `
  query GetShop($id: ID!) {
    getShop(id: $id) {
      id
      shopName
      corner
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listShops = /* GraphQL */ `
  query ListShops(
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shopName
        corner
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncShops = /* GraphQL */ `
  query SyncShops(
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShops(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        shopName
        corner
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getShoppingList = /* GraphQL */ `
  query GetShoppingList($id: ID!) {
    getShoppingList(id: $id) {
      id
      itemName
      unit
      quantity
      corner
      check
      directions
      recipeID
      recipeName
      owner
      bought
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listShoppingLists = /* GraphQL */ `
  query ListShoppingLists(
    $filter: ModelShoppingListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemName
        unit
        quantity
        corner
        check
        directions
        recipeID
        recipeName
        owner
        bought
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncShoppingLists = /* GraphQL */ `
  query SyncShoppingLists(
    $filter: ModelShoppingListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShoppingLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        itemName
        unit
        quantity
        corner
        check
        directions
        recipeID
        recipeName
        owner
        bought
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listMenus = /* GraphQL */ `
  query ListMenus(
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        recipes {
          nextToken
          startedAt
          __typename
        }
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMenus = /* GraphQL */ `
  query SyncMenus(
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMenus(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        recipes {
          nextToken
          startedAt
          __typename
        }
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      itemName
      unit
      corner
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemName
        unit
        corner
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncItems = /* GraphQL */ `
  query SyncItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        itemName
        unit
        corner
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getItemPreset = /* GraphQL */ `
  query GetItemPreset($id: ID!) {
    getItemPreset(id: $id) {
      id
      itemName
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
export const listItemPresets = /* GraphQL */ `
  query ListItemPresets(
    $filter: ModelItemPresetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemPresets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemName
        unit
        corner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncItemPresets = /* GraphQL */ `
  query SyncItemPresets(
    $filter: ModelItemPresetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncItemPresets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        itemName
        unit
        corner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRecipeItem = /* GraphQL */ `
  query GetRecipeItem($id: ID!) {
    getRecipeItem(id: $id) {
      id
      recipeItemName
      quantity
      corner
      recipeID
      unit
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRecipeItems = /* GraphQL */ `
  query ListRecipeItems(
    $filter: ModelRecipeItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipeItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        recipeItemName
        quantity
        corner
        recipeID
        unit
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRecipeItems = /* GraphQL */ `
  query SyncRecipeItems(
    $filter: ModelRecipeItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecipeItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        recipeItemName
        quantity
        corner
        recipeID
        unit
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const recipeItemsByRecipeID = /* GraphQL */ `
  query RecipeItemsByRecipeID(
    $recipeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recipeItemsByRecipeID(
      recipeID: $recipeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        recipeItemName
        quantity
        corner
        recipeID
        unit
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      recipeName
      memo
      url
      serving
      category
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
          recipeItemName
          quantity
          corner
          recipeID
          unit
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        recipeName
        memo
        url
        serving
        category
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRecipes = /* GraphQL */ `
  query SyncRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecipes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        recipeName
        memo
        url
        serving
        category
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRecipeMenu = /* GraphQL */ `
  query GetRecipeMenu($id: ID!) {
    getRecipeMenu(id: $id) {
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      recipe {
        id
        recipeName
        memo
        url
        serving
        category
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
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
export const listRecipeMenus = /* GraphQL */ `
  query ListRecipeMenus(
    $filter: ModelRecipeMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipeMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        menuId
        recipeId
        menu {
          id
          date
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        recipe {
          id
          recipeName
          memo
          url
          serving
          category
          like
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncRecipeMenus = /* GraphQL */ `
  query SyncRecipeMenus(
    $filter: ModelRecipeMenuFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecipeMenus(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        menuId
        recipeId
        menu {
          id
          date
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        recipe {
          id
          recipeName
          memo
          url
          serving
          category
          like
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const recipeMenusByMenuId = /* GraphQL */ `
  query RecipeMenusByMenuId(
    $menuId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recipeMenusByMenuId(
      menuId: $menuId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        menuId
        recipeId
        menu {
          id
          date
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        recipe {
          id
          recipeName
          memo
          url
          serving
          category
          like
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const recipeMenusByRecipeId = /* GraphQL */ `
  query RecipeMenusByRecipeId(
    $recipeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRecipeMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recipeMenusByRecipeId(
      recipeId: $recipeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        menuId
        recipeId
        menu {
          id
          date
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        recipe {
          id
          recipeName
          memo
          url
          serving
          category
          like
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
