import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Employee } from './Employee';
import './App.css';

interface AddEmployeeFormProps {
    employee: Employee;
    onSubmit: (employee: Employee, managerId: string) => void;
    onClose: () => void;
    onDelete: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ employee, onSubmit, onClose, onDelete }) => {
    const [employeeData, setEmployeeData] = useState<Employee>(employee);
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    
        if (name === 'email') {
            if (value && !isValidEmail(value)) {
                setError('Please enter a valid email address.');
            } else {
                setError('');
            }
        }
    
        if (name === 'phoneNumber') {
            if (value && !isValidPhoneNumber(value)) {
                setError('Please enter a valid phone number.');
            } else {
                setError('');
            }
        }
    };
    

    const isValidEmail = (email: string) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidPhoneNumber = (phoneNumber: string) => {
        const re = /^\+?([0-9]{1,3})?[-. (]?([0-9]{1,4})?[-. )]?([0-9]{1,4})?[-. ]?([0-9]{1,4})?[-. ]?([0-9]{1,9})?$/;
        return re.test(phoneNumber);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidEmail(employeeData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!isValidPhoneNumber(employeeData.phoneNumber || '')) {
            setError('Please enter a valid phone number.');
            return;
        }
        if (error) {
            alert("Please fix the errors before submitting.");
            return;
        }
        onSubmit(employeeData, employeeData.managerId || '');
    };

    return (
        <div className="add-employee-form">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type="text" name="name" value={employeeData.name || ''} onChange={handleChange} required />
                </label>
                <label>
                    Title
                    <input type="text" name="title" value={employeeData.title || ''} onChange={handleChange} required />
                </label>
                <label>
                    Department Name
                    <input type="text" name="departmentName" value={employeeData.departmentName || ''} onChange={handleChange} />
                </label>
                <label>
                    Phone Number
                    <input type="text" name="phoneNumber" value={employeeData.phoneNumber || ''} onChange={handleChange} />
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={employeeData.email || ''} onChange={handleChange} required />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button style={{ marginRight: "10px" }} type="submit">Save Changes</button>
                {employee.employeeId &&
                    <button style={{ marginLeft: "10px" }} type="button" onClick={onDelete}>Delete</button>
                }
            </form>
        </div>
    );
};

export default AddEmployeeForm;
