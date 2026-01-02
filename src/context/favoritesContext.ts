import { createContext } from "react";

export type FavoritesContextValue = {
  favoriteIds: string[];
  addFavorite: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
};

export const FavoritesContext =
  createContext<FavoritesContextValue | null>(null);
