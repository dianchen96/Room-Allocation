# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-09 06:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0008_auto_20160608_2306'),
    ]

    operations = [
        migrations.CreateModel(
            name='Allocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_finished', models.BooleanField(default=False)),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='room.Case')),
            ],
        ),
    ]
