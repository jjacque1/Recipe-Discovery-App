import { Link } from "react-router-dom";

type Props = {
  recipeId: string;
  recipeName: string;
  recipeImage: string;
};

export default function RecipeCard({ recipeId, recipeName, recipeImage }: Props) {
  return (
    <Link
      to={`/recipe/${recipeId}`}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "12px",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <img
        src={recipeImage}
        alt={recipeName}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h3 style={{ marginTop: "10px" }}>{recipeName}</h3>
    </Link>
  );
}
