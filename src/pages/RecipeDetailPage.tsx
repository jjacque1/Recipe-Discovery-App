import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { getMealDetailsUrl } from "../api/mealdb";
import { buildIngredientsList } from "../util/mealHelpers";
import useFavorites from "../context/useFavorites";

type Recipe = {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
};

type RecipeDetailsResponse = {
  meals: (Recipe & Record<string, string | null>)[] | null;
};

export default function RecipeDetailPage() {
  const { recipeId } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const recipeDetailsUrl = recipeId ? getMealDetailsUrl(recipeId) : null;

  const {
    data: recipeResponse,
    loading: isLoading,
    error: fetchError,
  } = useFetch<RecipeDetailsResponse>(recipeDetailsUrl);

  if (!recipeId) return <p>Missing recipe id.</p>;
  if (isLoading) return <Spinner />;
  if (fetchError) return <ErrorMessage message={fetchError} />;
  if (!recipeResponse || !recipeResponse.meals || recipeResponse.meals.length === 0) {
    return <p>Recipe not found.</p>;
  }

  const recipeData = recipeResponse.meals[0];
  const ingredientsList = buildIngredientsList(recipeData);

  

  if (!recipeId) return <p>Missing recipe id.</p>;

  const safeRecipeId = recipeId;

  const isCurrentlyFavorite = isFavorite(recipeId);

  function handleFavoriteClick() {
    if (isCurrentlyFavorite) {
      removeFavorite(safeRecipeId);
    } else {
      addFavorite(safeRecipeId);
    }
  }

  return (
    <div>
      <Link className="link" to="/">Back to categories</Link>

      <h1>{recipeData.strMeal}</h1>

      <button
        type="button"
        onClick={handleFavoriteClick}
        style={{ margin: "10px 0", padding: "8px 12px" }}
      >
        {isCurrentlyFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <p>
        <strong>Category:</strong> {recipeData.strCategory} •{" "}
        <strong>Area:</strong> {recipeData.strArea}
      </p>

      <img
        src={recipeData.strMealThumb}
        alt={recipeData.strMeal}
        style={{ maxWidth: "500px", width: "100%", borderRadius: "12px" }}
      />

      <h2>Ingredients</h2>
      {ingredientsList.length === 0 ? (
        <p>No ingredients listed.</p>
      ) : (
        <ul>
          {ingredientsList.map((ingredientItem) => (
            <li key={ingredientItem}>{ingredientItem}</li>
          ))}
        </ul>
      )}

      <h2>Instructions</h2>
      <p style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
        {recipeData.strInstructions}
      </p>
    </div>
  );
}
