import axios from 'axios';
import { Employee } from './Employee.ts';

// Configure Axios instance with base URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

// Fetch all employees
export const fetchEmployees = async () => {
    try {
        const response = await api.get('employees/');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch employees:', error);
        throw error;
    }
};

// Add a new employee
export const addEmployee = async (employee: Employee) => {
    try {
        const response = await api.post('employees/', employee);
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

// Update an existing employee
export const updateEmployee = async (employeeId: string, employee: Employee) => {
    try {
        const response = await api.put(`employees/${employeeId}/`, employee);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

// Delete an employee
export const deleteEmployee = async (employeeId:string) => {
    try {
        await api.delete(`employees/${employeeId}/`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};
