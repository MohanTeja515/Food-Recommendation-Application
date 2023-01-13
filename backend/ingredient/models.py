from django.db import models
from django.utils.timezone import now

class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=255)
    ingredient_quantity = models.CharField(max_length=255, blank=True)
    ingredient_date_created = models.DateTimeField(default=now)