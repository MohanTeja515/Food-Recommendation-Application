from email.policy import default
from django.db import models
from django.utils.timezone import now
from django.contrib.auth import get_user_model
User = get_user_model()

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    commenter_email = models.EmailField(max_length=255, null=True)
    comment_description = models.TextField()
    comment_likes = models.IntegerField(default=0)
    comment_dislikes = models.IntegerField(default=0)
    comment_date_created = models.DateTimeField(default=now)