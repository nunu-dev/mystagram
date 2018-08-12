from django.conf.urls import url
from django.urls import path

# view
from . import views

app_name = "images"
urlpatterns = [
    path('', view=views.Feed.as_view(), name="feed"),
    path('<int:image_id>/like/', view=views.LikeImage.as_view(), name="like_image"),
] 