# Generated by Django 3.2 on 2022-01-19 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20220119_0116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='firstName',
            field=models.CharField(max_length=150),
        ),
    ]
