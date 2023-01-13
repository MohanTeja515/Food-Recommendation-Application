// const API_KEY = '19bfab30d11e080acf4117582221ae77'
// const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  // myRecipes: 'http://127.0.0.1:8000/recipe/like/',
  likedRecipes: `http://127.0.0.1:8000/recipe/like/`,
  allRecipes: `http://127.0.0.1:8000/recipe/get-all-recipe/`,
  IndianRecipes: `http://127.0.0.1:8000/recipe/get-indian-recipes/`,
  MexicanRecipes: `http://127.0.0.1:8000/recipe/get-mexican-recipes/`,
  ChineseRecipes: `http://127.0.0.1:8000/recipe/get-chinese-recipes/`,
  LunchRecipes: `http://127.0.0.1:8000/recipe/get-lunch-recipes/`,
  BreakfastRecipes: `http://127.0.0.1:8000/recipe/get-breakfast-recipes/`,
  DinnerRecipes: `http://127.0.0.1:8000/recipe/get-dinner-recipes/`,
  SnackRecipes: `http://127.0.0.1:8000/recipe/get-snack-recipes/`,
  VegetarianRecipes: `http://127.0.0.1:8000/recipe/get-vegetarian-recipes/`,
  NonVegetarianRecipes: `http://127.0.0.1:8000/recipe/get-non-vegetarian-recipes/`,
  fiveMinRecipes: `http://127.0.0.1:8000/recipe/get-five-min-recipes/`,
}

export default requests