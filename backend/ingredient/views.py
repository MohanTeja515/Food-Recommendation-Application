from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

from .models import Ingredient
from .serializers import ListIngredientSerializer
from django.contrib.postgres.search import SearchVector, SearchQuery
from recipe.models import Recipe
    
class ManageIngredientView(APIView):
    
    # def get(self, request, format=None):
    #     try:
    #         user = request.user

    #         if not user.is_contributor:
    #             return Response(
    #                 {'error': 'User does not have necessary permissions for getting this listing data'},
    #                 status=status.HTTP_403_FORBIDDEN
    #             )

    #         ingredient_slug = request.query_params.get('ingredient_slug')

    #         if not ingredient_slug:
    #             listing = Ingredient.objects.order_by('-ingredient_date_created').filter(
    #                 contributor_email=user.email
    #             )
    #             listing = ListIngredientSerializer(listing, many=True)
    #             return Response(
    #                 {'listing': listing.data},
    #                 status=status.HTTP_200_OK
    #             )

    #         if not Ingredient.objects.filter(
    #             contributor_email=user.email,
    #             ingredient_slug=ingredient_slug
    #         ).exists():
    #             return Response(
    #                 {'error': 'Listing not found'},
    #                 status=status.HTTP_404_NOT_FOUND
    #             )

    #         listing = Ingredient.objects.get(
    #             contributor_email=user.email,
    #             ingredient_slug=ingredient_slug
    #         )
    #         listing = ListIngredientSerializer(listing)

    #         return Response(
    #             {'listing': listing.data},
    #             status=status.HTTP_200_OK
    #         )
    #     except:
    #         return Response(
    #             {'error': 'Something went wrong, List cant be found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    #         )


    def retrieve_values(self, data):

        ingredient_name = data['ingredient_name']
        ingredient_quantity = data['ingredient_quantity']

        data = {
            'ingredient_name': ingredient_name,
            'ingredient_quantity': ingredient_quantity
        }

        return data


    def post(self, request):
        try:
            user = request.user

            if not user.is_contributor:
                return Response(
                    {'error': 'User does not have necessary permissions for getting this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )
                
            data = request.data
            recipe = Recipe.objects.get(pk=data['recipe'])
            
            if Ingredient.objects.filter(recipe=data['recipe'], ingredient_name = data['ingredient_name']).exists():
                return Response(
                            {'ingredients': 'Ingredient already exists'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            
            else:
                if not recipe.contributor_email == user.email:
                    return Response(
                        {'error': 'Forbidden'},
                        status=status.HTTP_403_FORBIDDEN
                    )
                    
                else:
                    ingredient_data = Ingredient.objects.create(ingredient_name = data['ingredient_name'], ingredient_quantity = data['ingredient_quantity'])
                    
                    recipe.ingredients.add(ingredient_data)
                    return Response(
                        {'success': 'Ingredient added successfully'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                    
            
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
            
    def patch(self, request):
        try:
            user = request.user

            if not user.is_contributor:
                return Response(
                    {'error': 'User does not have necessary permissions for updating this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            data = request.data

            id = data['id']
            ingredient_name = data['ingredient_name']
            ingredient_quantity = data['ingredient_quantity']

            if not Ingredient.objects.filter(id=id).exists():
                return Response(
                    {'error': 'Ingredient does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            Ingredient.objects.filter(id=id).update(
                ingredient_name=ingredient_name,
                ingredient_quantity=ingredient_quantity
            )

            return Response(
                {'success': 'Ingredient updated successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
            
    def delete(self, request):
        try:
            user = request.user

            if not user.is_contributor:
                return Response(
                    {'error': 'User does not have necessary permissions for deleting this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            data = request.data
            
            id = data['id']
            
            if not Ingredient.objects.filter(id=id).exists():
                return Response(
                    {'error': 'Ingredient does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            Ingredient.objects.filter(id=id).delete()

            return Response(
                {'success': 'Ingredient deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    
class SearchIngredientView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        try:
            search = request.query_params.get('search')
            vector = SearchVector('ingredient_name', )
            query = SearchQuery(search)
            
            if not Ingredient.objects.annotate(
                search = vector
            ).filter(
                search = query
            ).exists():
                return Response(
                    {'error': 'No Ingredient found with this name'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            listings = Ingredient.objects.annotate(
                search=vector
            ).filter(
                search=query
            )
            listings = ListIngredientSerializer(listings, many=True)

            return Response(
                {'ingredient': listings.data},
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )