from rest_framework import generics, status
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer
from storage.JSONstorage import JSONstorage

class EmployeeListCreate(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return read_data_from_json()

    def perform_create(self, serializer):
        data = read_data_from_json()
        serialized_data = serializer.data
        data.append(serialized_data)
        write_data_to_json(data)

class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EmployeeSerializer

    def get_object(self):
        """Retrieve an employee from JSON file based on the employeeId from URL."""
        employeeId = self.kwargs.get('pk')
        data = read_data_from_json()
        employee = next((item for item in data if item['employeeId'] == employeeId), None)
        if employee is None:
            raise Http404("No Employee matches the given query.")
        return employee

    def perform_update(self, serializer):
        instance = self.get_object()  # Fetch the current instance
        data = read_data_from_json()
        for index, item in enumerate(data):
            if item['employeeId'] == instance['employeeId']:
                data[index] = serializer.validated_data  # Update with validated data
                write_data_to_json(data)
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    def perform_destroy(self, instance):
        data = read_data_from_json()
        employeeId = instance['employeeId']  # Use the 'employeeId' from the instance
        new_data = [item for item in data if item['employeeId'] != employeeId]
        if len(data) == len(new_data):
            return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
        write_data_to_json(new_data)
        return Response(status=status.HTTP_204_NO_CONTENT)


def read_data_from_json():
    storage = JSONstorage(location='storage')
    return storage.read_json('employeeData.json')

def write_data_to_json(data):
    storage = JSONstorage(location='storage')
    storage.write_json('employeeData.json', data)
