# Generated by Django 4.1.7 on 2024-04-09 03:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuideRequirement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('location', models.TextField()),
                ('date', models.DateField()),
                ('status', models.CharField(default='active', max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='guide_requirement', to='registration.user')),
            ],
        ),
        migrations.CreateModel(
            name='GuideRequirementHiring',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='pending', max_length=50)),
                ('price', models.FloatField()),
                ('guide', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='guide_requirement_hiring', to='registration.guide')),
                ('guidereq', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='guide_requirement_hiring', to='guidefind.guiderequirement')),
            ],
        ),
    ]
