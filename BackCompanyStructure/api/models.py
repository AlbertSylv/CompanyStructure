from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    department_name = models.CharField(max_length=100, blank=True, null=True)
    depth = models.IntegerField()
    employee_id = models.CharField(max_length=100) 
    manager_id = models.CharField(max_length=100)
