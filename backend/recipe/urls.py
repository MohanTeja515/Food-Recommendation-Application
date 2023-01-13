from django.urls import path
from .views import BreakFastRecipeView, ChineseRecipeView, DetailRecipeView, DinnerRecipeView, FiveMinRecipeView, IndianRecipeView, LikedRecipeView, ListRecipeView, LunchRecipeView, ManageRecipeView, MexicanRecipeView, NonVegetarianRecipeView, SearchRecipeView, SnackRecipeView, VegetarianRecipeView


urlpatterns = [
    path('manage-recipe/', ManageRecipeView.as_view()),

    path('get-all-recipes/', ListRecipeView.as_view()),
    path('get-indian-recipes/', IndianRecipeView.as_view()),
    path('get-mexican-recipes/', MexicanRecipeView.as_view()),
    path('get-chinese-recipes/', ChineseRecipeView.as_view()),
    path('get-lunch-recipes/', LunchRecipeView.as_view()),
    path('get-breakfast-recipes/', BreakFastRecipeView.as_view()),
    path('get-dinner-recipes/', DinnerRecipeView.as_view()),
    path('get-snack-recipes/', SnackRecipeView.as_view()),
    path('get-vegetarian-recipes/', VegetarianRecipeView.as_view()),
    path('get-non-vegetarian-recipes/', NonVegetarianRecipeView.as_view()),
    path('get-five-min-recipes/', FiveMinRecipeView.as_view()),

    path('get-recipe/<recipe_slug>/', DetailRecipeView.as_view()),
    # path('get-recipe/chef/', DetailRecipeChefView.as_view()),
    path('filter/', SearchRecipeView.as_view()),
    path('like/', LikedRecipeView.as_view())
]