from rest_framework import serializers
from comment.serializers import ListCommentSerializer

from ingredient.serializers import ListIngredientSerializer
from .models import Recipe, LikedRecipes

class ListRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'recipe_title', 'recipe_slug', 'recipe_rating', 'recipe_numReviews', 'prep_time', 'meal_type', 'food_type', 'cuisine_type', 'recipe_main_photo', 'recipe_photo1', 'recipe_photo2', 'recipe_photo3', 'is_published', 'contributor', 'recipe_description']

class LikedRecipesSerializer(serializers.ModelSerializer):
    # recipe = ListRecipeSerializer(many=True)
    class Meta:
        model = LikedRecipes
        fields = '__all__'
        
class DetailRecipeSerializer(serializers.ModelSerializer):
    ingredients = ListIngredientSerializer(many=True)
    comments = ListCommentSerializer(many=True)
    class Meta:
        model = Recipe
        fields = '__all__'
        lookup_field = 'recipe_slug'