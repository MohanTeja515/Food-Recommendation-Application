from django.urls import path
from .views import ManageCommentView


urlpatterns = [
    path('manage-comment/', ManageCommentView.as_view()),
]