from django.conf.urls import url
from django.urls import path

# view
from . import views

app_name = "images"
urlpatterns = [
    path("all/", view=views.ListAllImages.as_view(), name="all_images"),
] 