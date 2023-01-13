enum FoodEnum {
    VEGETARIAN = 'Vegetarian',
    NON_VEGETARIAN = 'Non Vegetarian'
}

enum CuisineEnum {
    CHINESE = 'Chinese',
    INDIAN = 'Indian',
    MEXICAN = 'Mexican',
    OTHER = 'Other'
}

enum MealEnum {
    BREAKFAST = 'BREAKFAST',
    LUNCH = 'LUNCH',
    DINNER = 'DINNER',
    SNACK = 'SNACK',
    DRINK = 'DRINK'
}


export interface RecipeType {
    id: number
    recipe_title: string
    recipe_slug: string
    food_type: FoodEnum
    cuisine_type: CuisineEnum
    is_published: boolean
    prep_time: number
    recipe_description: string
    meal_type: MealEnum
    recipe_main_photo: string
    recipe_photo1: string
    recipe_photo2: string
    recipe_photo3: string
    recipe_rating: number
    recipe_numReviews: number
    contributor: number
}