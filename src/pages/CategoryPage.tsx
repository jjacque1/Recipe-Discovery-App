import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { getMealsByCategoryUrl } from "../api/mealdb";

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

  // Always call the hook (no conditional hook calls)
  const url = categoryName ? getMealsByCategoryUrl(categoryName) : null;
  const { data, loading, error } = useFetch<MealsByCategoryResponse>(url);

  if (!categoryName) return <p>Missing category name.</p>;
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || !data.meals) return <p>No meals found.</p>;

  return (
    <div>
      <h1>{categoryName} Recipes</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          marginTop: "12px",
        }}
      >
        {data.meals.map((meal) => (
          <Link
            key={meal.idMeal}
            to={`/recipe/${meal.idMeal}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ marginTop: "10px" }}>{meal.strMeal}</h3>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: "16px" }}>
        <Link to="/">← Back to categories</Link>
      </p>
    </div>
  );
}
