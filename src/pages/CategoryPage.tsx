import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { getMealsByCategoryUrl } from "../api/mealdb";
import RecipeCard from "../components/RecipeCard";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealsByCategoryResponse = {
  meals: Meal[] | null;
};

export default function CategoryPage() {
  const { categoryName } = useParams();

  const url = categoryName ? getMealsByCategoryUrl(categoryName) : null;
  const { data, loading, error } = useFetch<MealsByCategoryResponse>(url);

  if (!categoryName) return <p>Missing category name.</p>;
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || !data.meals) return <p>No meals found.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
        marginTop: "12px",
      }}
    >
      {data.meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          recipeId={meal.idMeal}
          recipeName={meal.strMeal}
          recipeImage={meal.strMealThumb}
        />
      ))}
    </div>
  );
}
