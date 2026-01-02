const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// These functions just RETURN the full URL we want to fetch.
export function getCategoriesUrl() {
  return `${BASE_URL}/categories.php`;
}

export function getMealsByCategoryUrl(categoryName: string) {
  return `${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`;
}

export function getMealDetailsUrl(mealId: string) {
  return `${BASE_URL}/lookup.php?i=${encodeURIComponent(mealId)}`;
}

export function getSearchMealsUrl(query: string) {
  return `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
}
