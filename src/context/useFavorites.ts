import { useContext } from "react";
import { FavoritesContext } from "./favoritesContext";
import type { FavoritesContextValue } from "./favoritesContext";

export default function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
