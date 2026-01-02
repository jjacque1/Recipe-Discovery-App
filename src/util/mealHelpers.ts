type RecipeWithIngredients = Record<string, string | null>;


export function buildIngredientsList(recipeData: RecipeWithIngredients) {
  const ingredientsList: string[] = [];

  for (let index = 1; index <= 20; index++) {
    const ingredient = recipeData[`strIngredient${index}`];
    const measure = recipeData[`strMeasure${index}`];

    const ingredientText =
      typeof ingredient === "string" ? ingredient.trim() : "";

    const measureText =
      typeof measure === "string" ? measure.trim() : "";

    if (ingredientText) {
      ingredientsList.push(
        measureText
          ? `${ingredientText} — ${measureText}`
          : ingredientText
      );
    }
  }

  return ingredientsList;
}
