import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shop: string;
  readonly corner?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shop: string;
  readonly corner?: (string | null)[] | null;
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
  readonly item: string;
  readonly unit?: string | null;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShoppingList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShoppingList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly item: string;
  readonly unit?: string | null;
  readonly quantity?: number | null;
  readonly corner?: string | null;
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
  readonly recipes?: (RecipeMenu | null)[] | null;
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
  readonly recipes: AsyncCollection<RecipeMenu>;
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
  readonly item: string;
  readonly unit?: string | null;
  readonly corner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly item: string;
  readonly unit?: string | null;
  readonly corner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerItemPreset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ItemPreset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly item: string;
  readonly unit?: string | null;
  readonly corner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItemPreset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ItemPreset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly item: string;
  readonly unit?: string | null;
  readonly corner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ItemPreset = LazyLoading extends LazyLoadingDisabled ? EagerItemPreset : LazyItemPreset

export declare const ItemPreset: (new (init: ModelInit<ItemPreset>) => ItemPreset) & {
  copyOf(source: ItemPreset, mutator: (draft: MutableModel<ItemPreset>) => MutableModel<ItemPreset> | void): ItemPreset;
}

type EagerRecipeItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecipeItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipeItem: string;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly recipeID?: string | null;
  readonly unit?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipeItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecipeItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipeItem: string;
  readonly quantity?: number | null;
  readonly corner?: string | null;
  readonly recipeID?: string | null;
  readonly unit?: string | null;
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
  readonly recipe: string;
  readonly memo?: string | null;
  readonly url?: string | null;
  readonly serving?: number | null;
  readonly category1?: string | null;
  readonly category2?: string | null;
  readonly like?: number | null;
  readonly Menus?: (RecipeMenu | null)[] | null;
  readonly RecipeItems?: (RecipeItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipe = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recipe, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly recipe: string;
  readonly memo?: string | null;
  readonly url?: string | null;
  readonly serving?: number | null;
  readonly category1?: string | null;
  readonly category2?: string | null;
  readonly like?: number | null;
  readonly Menus: AsyncCollection<RecipeMenu>;
  readonly RecipeItems: AsyncCollection<RecipeItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Recipe = LazyLoading extends LazyLoadingDisabled ? EagerRecipe : LazyRecipe

export declare const Recipe: (new (init: ModelInit<Recipe>) => Recipe) & {
  copyOf(source: Recipe, mutator: (draft: MutableModel<Recipe>) => MutableModel<Recipe> | void): Recipe;
}

type EagerRecipeMenu = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecipeMenu, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly menuId?: string | null;
  readonly recipeId?: string | null;
  readonly menu: Menu;
  readonly recipe: Recipe;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipeMenu = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RecipeMenu, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly menuId?: string | null;
  readonly recipeId?: string | null;
  readonly menu: AsyncItem<Menu>;
  readonly recipe: AsyncItem<Recipe>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RecipeMenu = LazyLoading extends LazyLoadingDisabled ? EagerRecipeMenu : LazyRecipeMenu

export declare const RecipeMenu: (new (init: ModelInit<RecipeMenu>) => RecipeMenu) & {
  copyOf(source: RecipeMenu, mutator: (draft: MutableModel<RecipeMenu>) => MutableModel<RecipeMenu> | void): RecipeMenu;
}