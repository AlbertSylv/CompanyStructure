from django.urls import path
from api import views

urlpatterns = [
    path('employees/', views.EmployeeListCreate.as_view(), name='employee-list-create'),
    path('employees/<str:pk>/', views.EmployeeDetail.as_view(), name='employee-detail'),
]
