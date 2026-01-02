import { Link } from "react-router-dom";
import { getCategoriesUrl } from "../api/mealdb";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoriesResponse = {
  categories: Category[];
};

export default function HomePage() {
  const url = getCategoriesUrl();
  const { data, loading, error } = useFetch<CategoriesResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <p>No data found.</p>;

  return (
    <div>
      <h1>Categories</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          marginTop: "12px",
        }}
      >
        {data.categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${cat.strCategory}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ marginTop: "10px" }}>{cat.strCategory}</h3>
            <p style={{ fontSize: "14px" }}>
              {cat.strCategoryDescription.slice(0, 90)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
