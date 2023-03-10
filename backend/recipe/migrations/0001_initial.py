# Generated by Django 4.1.5 on 2023-01-07 04:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('comment', '0001_initial'),
        ('ingredient', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LikedRecipes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_email', models.EmailField(max_length=255, null=True)),
                ('recipe_id', models.IntegerField(null=True)),
                ('does_liked', models.CharField(choices=[('YES', 'Yes'), ('NO', 'No'), ('NO_OPINION', 'No Opinion')], default='NO_OPINION', max_length=30)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contributor_email', models.EmailField(max_length=255, null=True)),
                ('recipe_title', models.CharField(max_length=255)),
                ('recipe_slug', models.SlugField(unique=True)),
                ('recipe_rating', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('recipe_numReviews', models.IntegerField(blank=True, default=0, null=True)),
                ('recipe_description', models.TextField()),
                ('meal_type', models.CharField(choices=[('BREAKFAST', 'Breakfast'), ('LUNCH', 'Lunch'), ('DINNER', 'Dinner'), ('SNACK', 'Snack'), ('DRINK', 'Drink')], default='LUNCH', max_length=100)),
                ('cuisine_type', models.CharField(choices=[('Chinese', 'Chinese'), ('Indian', 'Indian'), ('Mexican', 'Mexican'), ('Other', 'Other')], default='Other', max_length=100)),
                ('food_type', models.CharField(choices=[('Vegetarian', 'Vegetarian'), ('Non Vegetarian', 'Non Vegetarian')], default='Vegetarian', max_length=100)),
                ('recipe_main_photo', models.ImageField(blank=True, null=True, upload_to='recipes/')),
                ('recipe_photo1', models.ImageField(blank=True, null=True, upload_to='recipes/')),
                ('recipe_photo2', models.ImageField(blank=True, null=True, upload_to='recipes/')),
                ('recipe_photo3', models.ImageField(blank=True, null=True, upload_to='recipes/')),
                ('prep_time', models.IntegerField()),
                ('is_published', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('comments', models.ManyToManyField(to='comment.comment')),
                ('contributor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('ingredients', models.ManyToManyField(to='ingredient.ingredient')),
                ('likes', models.ManyToManyField(to='recipe.likedrecipes')),
            ],
        ),
    ]
