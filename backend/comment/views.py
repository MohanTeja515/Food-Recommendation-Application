from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Comment
from recipe.models import Recipe
    
class ManageCommentView(APIView):

    def retrieve_values(self, data):

        comment_description = data['comment_description']
        comment_likes = data['comment_likes']
        try:
            comment_likes = int(comment_likes)
        except:
            return -1
        comment_dislikes = data['comment_dislikes']
        try:
            comment_dislikes = float(comment_dislikes)
        except:
            return -2

        data = {
            'comment_description': comment_description,
            'comment_likes': comment_likes,
            'comment_dislikes': comment_dislikes
        }

        return data


    def post(self, request):
        try:
            user = request.user
                
            data = request.data
            
            commenter_email = data['commenter_email']
            recipe = Recipe.objects.get(pk=data['recipe'])
            
            if Comment.objects.filter(recipe=data['recipe'], comment_description = data['comment_description'], commenter_email=user.email).exists():
                return Response(
                            {'comment': 'You already added this comment'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            
            else:
                    
                comment_data = Comment.objects.create(comment_description = data['comment_description'], commenter_email=user.email)
                    
                recipe.comments.add(comment_data)
                return Response(
                    {'success': 'Comment added successfully'},
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
            comment_likes = data['comment_likes']
            comment_dislikes = data['comment_dislikes']

            if not Comment.objects.filter(id=id).exists():
                return Response(
                    {'error': 'Comment does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
                
            Comment.objects.filter(id=id).update(
                comment_likes=comment_likes,
                comment_dislikes=comment_dislikes
            )

            return Response(
                {'success': 'Comment updated successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    def put(self, request):
        try:
            user = request.user

            if not user.is_contributor:
                return Response(
                    {'error': 'User does not have necessary permissions for updating this listing data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            data = request.data

            id = data['id']
            comment_description = data['comment_description']

            if not Comment.objects.filter(id=id).exists():
                return Response(
                    {'error': 'Comment does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if not Comment.objects.filter(id=id, commenter_email=user.email).exists():
                return Response(
                    {'error': 'You dont have permission to edit this comment'},
                    status=status.HTTP_404_NOT_FOUND
                )
                
            Comment.objects.filter(id=id, commenter_email=user.email).update(
                comment_description=comment_description
            )

            return Response(
                {'success': 'Comment updated successfully'},
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
            
            if not Comment.objects.filter(id=id).exists():
                return Response(
                    {'error': 'Comment does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            Comment.objects.filter(id=id).delete()

            return Response(
                {'success': 'Ingredient deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )