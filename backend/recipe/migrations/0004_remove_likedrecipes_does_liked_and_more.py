# Generated by Django 4.1.5 on 2023-01-11 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0003_alter_recipe_recipe_main_photo_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='likedrecipes',
            name='does_liked',
        ),
        migrations.AlterField(
            model_name='recipe',
            name='recipe_rating',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
