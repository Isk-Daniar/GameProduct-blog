# Generated by Django 4.0.5 on 2022-12-21 07:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0004_rename_title_expandpost_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postblog',
            name='tags',
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]
