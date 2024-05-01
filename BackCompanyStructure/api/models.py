from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=100, blank=True, null=True)
    departmentName = models.CharField(max_length=100, blank=True, null=True)
    depth = models.IntegerField()
    employeeId = models.CharField(max_length=100) 
    managerId = models.CharField(max_length=100)
