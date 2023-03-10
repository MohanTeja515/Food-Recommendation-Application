from rest_framework import serializers

from .models import Ingredient

class ListIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'