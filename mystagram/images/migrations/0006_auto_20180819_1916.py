# Generated by Django 2.0.7 on 2018-08-19 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0005_image_tags'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='create_at',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='like',
            old_name='create_at',
            new_name='created_at',
        ),
    ]