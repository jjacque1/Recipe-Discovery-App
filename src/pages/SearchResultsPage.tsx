import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import { getSearchMealsUrl } from "../api/mealdb";

type SearchMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type SearchResponse = {
  meals: SearchMeal[] | null;
};

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const searchQuery = (params.get("query") || "").trim();

  // If query is empty, don't fetch
  const searchUrl = searchQuery ? getSearchMealsUrl(searchQuery) : null;

  const {
    data: searchResponse,
    loading: isLoading,
    error: fetchError,
  } = useFetch<SearchResponse>(searchUrl);

  if (!searchQuery) {
    return (
      <div>
        <h1>Search</h1>
        <p>Please type something in the search box.</p>
        <Link to="/">Back to categories</Link>
      </div>
    );
  }

  if (isLoading) return <Spinner />;
  if (fetchError) return <ErrorMessage message={fetchError} />;
  if (!searchResponse || !searchResponse.meals) {
    return (
      <div>
        <h1>Results for: {searchQuery}</h1>
        <p>No results found.</p>
        <Link to="/">Back to categories</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Results for: {searchQuery}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          marginTop: "12px",
        }}
      >
        {searchResponse.meals.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipeId={recipe.idMeal}
            recipeName={recipe.strMeal}
            recipeImage={recipe.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
}
