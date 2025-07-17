from django.db import models

# Create your models here.


class Employee(models.Model):
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    role = models.CharField(max_length=255)

    def __str__(self):
        return self.name
