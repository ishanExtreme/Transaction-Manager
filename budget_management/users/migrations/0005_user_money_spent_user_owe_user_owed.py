# Generated by Django 4.0.8 on 2022-12-31 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_budget'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='money_spent',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='user',
            name='owe',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='user',
            name='owed',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]
