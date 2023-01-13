from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import status, permissions
from .models import LikedRecipes, Recipe, User
from .serializers import DetailRecipeSerializer, LikedRecipesSerializer, ListRecipeSerializer
from django.contrib.postgres.search import SearchVector, SearchQuery


class ManageRecipeView(APIView):

    def get(self, request, format=None):
        try:
            user = request.user

            if not user.is_chef:
                return Response(
                    {'error': 'User does not have necessary permissions for getting this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            recipe_slug = request.query_params.get('recipe_slug')

            if not recipe_slug:
                listing = Recipe.objects.order_by('-date_created').filter(
                    contributor_email=user.email
                )
                listing = ListRecipeSerializer(listing, many=True)
                return Response(
                    {'listing': listing.data},
                    status=status.HTTP_200_OK
                )

            if not Recipe.objects.filter(
                contributor_email=user.email,
                recipe_slug=recipe_slug
            ).exists():
                return Response(
                    {'error': 'Listing not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            listing = Recipe.objects.get(
                contributor_email=user.email,
                recipe_slug=recipe_slug
            )
            listing = ListRecipeSerializer(listing)

            return Response(
                {'listing': listing.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong, List cant be found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def retrieve_values(self, data):

        recipe_title = data['recipe_title']
        recipe_slug = data['recipe_slug']
        recipe_description = data['recipe_description']

        x = data['prep_time']
        data['prep_time'] = int(''.join(filter(str.isdigit, x)))
        prep_time = data['prep_time']
        try:
            prep_time = int(prep_time)
        except:
            return -1

        y = data['recipe_rating']
        data['recipe_rating'] = int(''.join(filter(str.isdigit, y)))
        recipe_rating = data['recipe_rating']
        try:
            recipe_rating = float(recipe_rating)
        except:
            return -2

        z = data['recipe_numReviews']
        data['recipe_numReviews'] = int(''.join(filter(str.isdigit, z)))
        recipe_numReviews = data['recipe_numReviews']
        try:
            recipe_numReviews = int(recipe_numReviews)
        except:
            return -2

        meal_type = data['meal_type']

        food_type = data['food_type']
        cuisine_type = data['cuisine_type']
        recipe_main_photo = data['recipe_main_photo']
        recipe_photo1 = data['recipe_photo1']
        recipe_photo2 = data['recipe_photo2']
        recipe_photo3 = data['recipe_photo3']
        is_published = data['is_published']

        if is_published == 'True':
            is_published = True
        else:
            is_published = False

        data = {
            'recipe_title': recipe_title,
            'recipe_slug': recipe_slug,
            'recipe_rating': recipe_rating,
            'recipe_description': recipe_description,
            'recipe_main_photo': recipe_main_photo,
            'is_published': is_published,
            'food_type': food_type,
            'recipe_numReviews': recipe_numReviews,
            'recipe_photo1': recipe_photo1,
            'recipe_photo2': recipe_photo2,
            'recipe_photo3': recipe_photo3,
            'meal_type': meal_type,
            'cuisine_type': cuisine_type,
            # 'main_photo': recipe_main_photo,
            'prep_time': prep_time,
        }

        return data

    def post(self, request):

        try:
            user = request.user

            if not user.is_chef:
                return Response(
                    {'error': 'User does not have necessary permissions for getting this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )
            request.data._mutable = True
            data = request.data
            print(data)

            data = self.retrieve_values(data)

            if data == -1:
                return Response(
                    {'error': 'pr'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            elif data == -2:
                return Response(
                    {'error': 'rating must be an float'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            elif data == -3:
                return Response(
                    {'error': 'number of reviews must be an integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            listing = ListRecipeSerializer(data=request.data)

            if listing.is_valid():
                if Recipe.objects.filter(recipe_slug=listing.validated_data['recipe_slug']).exists():
                    return Response(
                        {'error': 'Listing with this slug already exists'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                listing = listing.save()
                listing.contributor_email = user.email
                listing.contributor = User.objects.get(pk=user.id)
                listing.save()
                return Response({'id': listing.id}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(str(e))
            return Response(
                {'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def patch(self, request):
        try:
            user = request.user

            if not user.is_chef:
                return Response(
                    {'error': 'User does not have necessary permissions for updating this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            data = request.data

            # recipe_title = data['recipe_title']
            recipe_slug = data['recipe_slug']
            recipe_description = data['recipe_description']

            if not Recipe.objects.filter(contributor_email=user.email, recipe_slug=recipe_slug).exists():
                return Response(
                    {'error': 'Listing does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # x = data['prep_time']
            # data['prep_time'] = int(''.join(filter(str.isdigit, x)))
            # prep_time = data['prep_time']
            # try:
            #     prep_time = int(prep_time)
            # except:
            #     return Response(
            #         {'error': 'prep time must be an integer'},
            #         status=status.HTTP_400_BAD_REQUEST
            #     )

            

            recipe_rating = data['recipe_rating']
            try:
                recipe_rating = float(recipe_rating)
            except:
                return Response(
                    {'error': 'rating must be an float'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            recipe_numReviews = data['recipe_numReviews']
            try:
                recipe_numReviews = int(recipe_numReviews)
            except:
                return Response(
                    {'error': 'number of reviews must be an integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # meal_type = data['meal_type']

            # food_type = data['food_type']
            # cuisine_type = data['cuisine_type']
            recipe_main_photo = data['recipe_main_photo']
            # recipe_photo1 = data['recipe_photo1']
            # recipe_photo2 = data['recipe_photo2']
            # recipe_photo3 = data['recipe_photo3']
            is_published = data['is_published']
            if is_published == 'true' or is_published == 'True':
                is_published = True
            else:
                is_published = False

            listing = ListRecipeSerializer(data=request.data)

            # recipe = Recipe.objects.get(contributor_email=user.email, recipe_slug=recipe_slug)
            Recipe.objects.filter(contributor_email=user.email, recipe_slug=recipe_slug).update(
                # recipe_title= recipe_title,
                recipe_slug=recipe_slug,
                recipe_rating=recipe_rating,
                recipe_description=recipe_description,
                # recipe_main_photo= recipe_main_photo,
                is_published=is_published,
                # food_type= food_type,
                recipe_numReviews=recipe_numReviews,
                # recipe_photo1= recipe_photo1,
                # recipe_photo2= recipe_photo2,
                # recipe_photo3= recipe_photo3,
                # meal_type= meal_type,
                # cuisine_type= cuisine_type,
                main_photo= recipe_main_photo,
                # prep_time=prep_time,
            )

            return Response(
                {'success': 'Listing publish status updated successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            print(str(e))
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request):
        try:
            user = request.user

            if not user.is_chef:
                return Response(
                    {'error': 'User does not have necessary permissions for deleting this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            data = request.data

            try:
                recipe_slug = data['recipe_slug']
            except:
                return Response(
                    {'error': 'Slug was not provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if not Recipe.objects.filter(contributor_email=user.email, recipe_slug=recipe_slug).exists():
                return Response(
                    {'error': 'Listing you are trying to delete does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            Recipe.objects.filter(
                contributor_email=user.email, recipe_slug=recipe_slug).delete()

            if not Recipe.objects.filter(contributor_email=user.email, recipe_slug=recipe_slug).exists():
                return Response(
                    status=status.HTTP_204_NO_CONTENT
                )
            else:
                return Response(
                    {'error': 'Failed to delete listing'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request):
        try:
            user = request.user

            if not user.is_chef:
                return Response(
                    {'error': 'User does not have necessary permissions for updating this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            origListing = Recipe.objects.get(
                recipe_slug=request.data['recipe_slug'])
            origListingPhoto = origListing.recipe_main_photo
            listing = ListRecipeSerializer(origListing, data=request.data)

            if listing.is_valid():
                if not Recipe.objects.filter(contributor_email=user.email, recipe_slug=listing.validated_data['recipe_slug']).exists():
                    return Response(
                        {'error': 'Listing does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )

                listing = listing.save()
                if not listing.recipe_main_photo:
                    listing.recipe_main_photo = origListingPhoto
                    listing.save()

                return Response(
                    {'success': 'Listing_updated Successfully'},
                    status=status.HTTP_200_OK
                )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter()
        # is_published=True
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'


class IndianRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(cuisine_type='Indian')
        # is_published=True,
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'


class ChineseRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(cuisine_type='Chinese')
        # is_published=True, 
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'


class MexicanRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(cuisine_type='Mexican')
        # is_published=True, 
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'


class LunchRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(meal_type='LUNCH')
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'

class BreakFastRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(meal_type='BREAKFAST')
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'

class DinnerRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(is_published=True, meal_type='DINNER')
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'

class SnackRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(is_published=True, meal_type='SNACK')
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'

class VegetarianRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(is_published=True, food_type='Vegetarian')
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'

class NonVegetarianRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(is_published=True, food_type='NonVegetarian')
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'

class FiveMinRecipeView(ListAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter(is_published=True, prep_time__lte=5)
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListRecipeSerializer
    lookup_field = 'recipe_slug'


class DetailRecipeView(RetrieveAPIView):
    queryset = Recipe.objects.order_by(
        '-date_created').filter()
    permission_classes = (permissions.AllowAny, )
    serializer_class = DetailRecipeSerializer
    lookup_field = 'recipe_slug'

# class DetailRecipeChefView(APIView):
#     def get(self, request, format=None):
#         try:
#             user = request.user

#             if not user.is_chef:
#                 return Response(
#                     {'error': 'User does not have necessary permissions for getting this listing data'},
#                     status=status.HTTP_403_FORBIDDEN
#                 )

#             recipe_slug = request.query_params.get('recipe_slug')

#             if not recipe_slug:
#                 listing = Recipe.objects.order_by('-date_created').filter(contributor_email=user.email, recipe_slug=recipe_slug)
#                 listing = ListRecipeSerializer(listing, many=True)
#                 return Response(
#                     {'listing': listing.data},
#                     status=status.HTTP_200_OK
#                 )

#             if not Recipe.objects.filter(
#                 contributor_email=user.email,
#                 recipe_slug=recipe_slug
#             ).exists():
#                 return Response(
#                     {'error': 'Listing not found'},
#                     status=status.HTTP_404_NOT_FOUND
#                 )

#             listing = Recipe.objects.get(
#                 contributor_email=user.email,
#                 recipe_slug=recipe_slug
#             )
#             listing = ListRecipeSerializer(listing)

#             return Response(
#                 {'listing': listing.data},
#                 status=status.HTTP_200_OK
#             )
#         except:
#             return Response(
#                 {'error': 'Something went wrong, List cant be found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


class SearchRecipeView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        try:
            prep_time = request.query_params.get('prep_time')
            try:
                prep_time = int(prep_time)
            except:
                return Response(
                    {'error': 'Prep Time must be an integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            rating = request.query_params.get('recipe_rating')
            try:
                rating = float(rating)
            except:
                return Response(
                    {'error': 'Rating must be an Float'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            food_type = request.query_params.get('food_type')
            cuisine_type = request.query_params.get('cuisine_type')

            search = request.query_params.get('search')
            vector = SearchVector('recipe_title', 'recipe_description')
            query = SearchQuery(search)

            if not Recipe.objects.annotate(
                search=vector
            ).filter(
                search=query,
                prep_time__lte=prep_time,
                recipe_rating__gte=rating,
                food_type=food_type,
                cuisine_type=cuisine_type,
                is_published=True
            ).exists():
                return Response(
                    {'error': 'No listings found with this criteria'},
                    status=status.HTTP_404_NOT_FOUND
                )

            listings = Recipe.objects.annotate(
                search=vector
            ).filter(
                search=query,
                prep_time__lte=prep_time,
                recipe_rating__gte=rating,
                cuisine_type=cuisine_type,
                food_type=food_type,
                is_published=True
            )
            listings = ListRecipeSerializer(listings, many=True)

            return Response(
                {'listings': listings.data},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LikedRecipeView(APIView):

    def get(self, request, format=None):
        try:
            user = request.user

            if not LikedRecipes.objects.filter(
                user_email=user.email
            ).exists():
                return Response(
                    {'error': 'Your Liked Recipes is empty'},
                    status=status.HTTP_404_NOT_FOUND
                )

            listing = LikedRecipes.objects.filter(
                user_email=user.email
            )
            listing = LikedRecipesSerializer(listing, many=True)

            return Response(
                {'listing': listing.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            user = request.user

            data = request.data
            recipe = Recipe.objects.get(pk=data['recipe'])

            if not Recipe.objects.filter(pk=data['recipe']).exists():
                return Response(
                    {'recipe': 'Recipe either got deleted or does not exist'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            else:
                if not LikedRecipes.objects.filter(recipe=recipe, user_email=user.email).exists():

                    liked_data = LikedRecipes.objects.create(
                        recipe=recipe, recipe_id=data['recipe'], user_email=user.email, user=user)

                    recipe.likes.add(liked_data)
                    return Response(
                        {'success': 'Recipe added successfully to your liked list'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                else:
                    return Response(
                        {'error': 'Recipe is already in your liked list'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request):
        try:
            user = request.user

            data = request.data

            id = data['id']

            if not LikedRecipes.objects.filter(id=id, user_email=user.email).exists():
                return Response(
                    {'error': 'User does not have necessary permissions for deleting this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            if not LikedRecipes.objects.filter(id=id).exists():
                return Response(
                    {'error': 'Recipe does not exist in your liked list'},
                    status=status.HTTP_404_NOT_FOUND
                )

            LikedRecipes.objects.filter(id=id, user_email=user.email).delete()

            return Response(
                {'success': 'Recipe removed successfully from your liked list'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
