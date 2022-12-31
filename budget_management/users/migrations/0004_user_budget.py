# Generated by Django 4.0.8 on 2022-12-31 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_friend'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='budget',
            field=models.DecimalField(decimal_places=2, default=1000.0, max_digits=10),
        ),
    ]
