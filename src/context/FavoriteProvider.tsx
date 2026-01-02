import useLocalStorage from "../hooks/useLocalStorage";
import { FavoritesContext } from "./favoritesContext";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { value: favoriteIds, setValue: setFavoriteIds } =
    useLocalStorage<string[]>("favoriteRecipeIds", []);

  function addFavorite(recipeId: string) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(recipeId)
        ? currentIds
        : [...currentIds, recipeId]
    );
  }

  function removeFavorite(recipeId: string) {
    setFavoriteIds((currentIds) =>
      currentIds.filter((id) => id !== recipeId)
    );
  }

  function isFavorite(recipeId: string) {
    return favoriteIds.includes(recipeId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
