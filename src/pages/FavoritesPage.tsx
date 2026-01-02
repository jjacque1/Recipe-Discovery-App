import { Link } from "react-router-dom";
import useFavorites from "../context/useFavorites";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import { getMealDetailsUrl } from "../api/mealdb";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type RecipeDetailsResponse = {
  meals: Recipe[] | null;
};

// helper component: fetch one recipe by id and show a card
function FavoriteRecipeCard({ recipeId }: { recipeId: string }) {
  const detailsUrl = getMealDetailsUrl(recipeId);

  const { data, loading, error } = useFetch<RecipeDetailsResponse>(detailsUrl);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || !data.meals || data.meals.length === 0) return <p>Recipe not found.</p>;

  const recipe = data.meals[0];

  return (
    <RecipeCard
      recipeId={recipe.idMeal}
      recipeName={recipe.strMeal}
      recipeImage={recipe.strMealThumb}
    />
  );
}

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();

  return (
    <div>
      <h1>Favorites</h1>

      {favoriteIds.length === 0 ? (
        <div>
          <p>No favorites yet. Go add some from a recipe page.</p>
          <Link className="link" to="/">←Back to categories</Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginTop: "12px",
          }}
        >
          {favoriteIds.map((recipeId) => (
            <FavoriteRecipeCard key={recipeId} recipeId={recipeId} />
          ))}
        </div>
      )}
    </div>
  );
}
