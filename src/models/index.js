// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Shop, ShoppingList, Menu, Item, ItemPreset, RecipeItem, Recipe, RecipeMenu } = initSchema(schema);

export {
  Shop,
  ShoppingList,
  Menu,
  Item,
  ItemPreset,
  RecipeItem,
  Recipe,
  RecipeMenu
};