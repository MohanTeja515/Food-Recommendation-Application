from django.urls import path
from .views import ManageIngredientView, SearchIngredientView


urlpatterns = [
    path('manage-ingredient/', ManageIngredientView.as_view()),
    path('search-ingredient/', SearchIngredientView.as_view()),
]