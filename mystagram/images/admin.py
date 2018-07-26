from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

    list_display_links= (
        'location',
    )

    search_fields = (
        'location',
    )

    list_filter = (
        'location',
        'creator'
    )

    list_display=(
        'create_at',
        'updated_at',
        'file',
        'location',
        'caption',
        'creator'
    )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'image',
        'create_at',
        'updated_at',
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):

    list_display = (
        'message',
        'creator',
        'image',
        'create_at',
        'updated_at',
    )