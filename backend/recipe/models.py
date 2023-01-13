from django.db import models
from django.utils.timezone import now

from django.contrib.auth import get_user_model
from ingredient.models import Ingredient
from comment.models import Comment
User = get_user_model()

class LikedRecipes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    user_email = models.EmailField(max_length=255, null=True)
    recipe_id = models.IntegerField(null=True)
        
class Recipe(models.Model):
    class FoodType(models.TextChoices):
        VEGETARIAN = 'Vegetarian'
        NON_VEGETARIAN = 'Non Vegetarian'

    class CuisineType(models.TextChoices):
        CHINESE = 'Chinese'
        INDIAN = 'Indian'
        MEXICAN = 'Mexican'
        OTHER = 'Other'
        
    class MealType(models.TextChoices):
        BREAKFAST = 'BREAKFAST'
        LUNCH = 'LUNCH'
        DINNER = 'DINNER'
        SNACK = 'SNACK'
        DRINK = 'DRINK'

    contributor = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    ingredients = models.ManyToManyField(Ingredient)
    comments = models.ManyToManyField(Comment)
    contributor_email = models.EmailField(max_length=255, null=True)
    recipe_title = models.CharField(max_length=255)
    recipe_slug = models.SlugField(unique=True)
    recipe_rating = models.IntegerField(null=True, blank=True, default=0)
    recipe_numReviews = models.IntegerField(null=True, blank=True, default=0)
    recipe_description = models.TextField()
    meal_type = models.CharField(max_length=100, choices=MealType.choices, default=MealType.LUNCH)
    cuisine_type = models.CharField(max_length=100, choices=CuisineType.choices, default=CuisineType.OTHER)
    food_type = models.CharField(max_length=100, choices=FoodType.choices, default=FoodType.VEGETARIAN)
    recipe_main_photo = models.ImageField(upload_to='recipes/', null=True, blank=True)
    recipe_photo1 = models.ImageField(upload_to='recipes/', null=True, blank=True)
    recipe_photo2 = models.ImageField(upload_to='recipes/', null=True, blank=True)
    recipe_photo3 = models.ImageField(upload_to='recipes/', null=True, blank=True)
    prep_time = models.IntegerField()
    is_published = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=now)
    likes = models.ManyToManyField(LikedRecipes)
    
    def delete(self):
        self.recipe_main_photo.storage.delete(self.recipe_main_photo.name)