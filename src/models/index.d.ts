import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shopName: string;
  readonly corner?: (string | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shopName: string;
  readonly corner?: (string | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shop = LazyLoading extends LazyLoadingDisabled ? EagerShop : LazyShop

export declare const Shop: (new (init: ModelInit<Shop>) => Shop) & {
  copyOf(source: Shop, mutator: (draft: MutableModel<Shop>) => MutableModel<Shop> | void): Shop;
}

type EagerShoppingList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShoppingList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly itemName: string;
  readonly unit?: string | null;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly check?: boolean | null;
  readonly directions?: number | null;
  readonly recipeID?: string | null;
  readonly recipeName?: string | null;
  readonly owner?: string | null;
  readonly bought?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShoppingList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShoppingList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly itemName: string;
  readonly unit?: string | null;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly check?: boolean | null;
  readonly directions?: number | null;
  readonly recipeID?: string | null;
  readonly recipeName?: string | null;
  readonly owner?: string | null;
  readonly bought?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ShoppingList = LazyLoading extends LazyLoadingDisabled ? EagerShoppingList : LazyShoppingList

export declare const ShoppingList: (new (init: ModelInit<ShoppingList>) => ShoppingList) & {
  copyOf(source: ShoppingList, mutator: (draft: MutableModel<ShoppingList>) => MutableModel<ShoppingList> | void): ShoppingList;
}

type EagerMenu = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Menu, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly owner?: string | null;
  readonly recipeID?: string | null;
  readonly menuServing?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMenu = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Menu, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly owner?: string | null;
  readonly recipeID?: string | null;
  readonly menuServing?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Menu = LazyLoading extends LazyLoadingDisabled ? EagerMenu : LazyMenu

export declare const Menu: (new (init: ModelInit<Menu>) => Menu) & {
  copyOf(source: Menu, mutator: (draft: MutableModel<Menu>) => MutableModel<Menu> | void): Menu;
}

type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly itemName: string;
  readonly unit?: string | null;
  readonly corner?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly itemName: string;
  readonly unit?: string | null;
  readonly corner?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerRecipeItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecipeItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipeItemName: string;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly recipeID?: string | null;
  readonly unit?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipeItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecipeItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipeItemName: string;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly recipeID?: string | null;
  readonly unit?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RecipeItem = LazyLoading extends LazyLoadingDisabled ? EagerRecipeItem : LazyRecipeItem

export declare const RecipeItem: (new (init: ModelInit<RecipeItem>) => RecipeItem) & {
  copyOf(source: RecipeItem, mutator: (draft: MutableModel<RecipeItem>) => MutableModel<RecipeItem> | void): RecipeItem;
}

type EagerRecipe = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipe, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipeName: string;
  readonly memo?: string | null;
  readonly url?: string | null;
  readonly serving?: number | null;
  readonly category?: string | null;
  readonly like?: number | null;
  readonly RecipeItems?: (RecipeItem | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipe = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipe, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipeName: string;
  readonly memo?: string | null;
  readonly url?: string | null;
  readonly serving?: number | null;
  readonly category?: string | null;
  readonly like?: number | null;
  readonly RecipeItems: AsyncCollection<RecipeItem>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Recipe = LazyLoading extends LazyLoadingDisabled ? EagerRecipe : LazyRecipe

export declare const Recipe: (new (init: ModelInit<Recipe>) => Recipe) & {
  copyOf(source: Recipe, mutator: (draft: MutableModel<Recipe>) => MutableModel<Recipe> | void): Recipe;
}