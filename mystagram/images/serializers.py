from rest_framework import serializers
from . import models

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image

        comment_set = CommentSerializer(many=True)
        like_set = LikeSerializer(many=True)

        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comment_set'
        )

