import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Employee } from './Employee';
import './App.css';

interface AddEmployeeFormProps {
    employee: Employee; 
    onSubmit: (employee: Employee) => void;
    onClose: () => void; 
    onDelete: () => void; 
  }

  
const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ employee, onSubmit, onClose, onDelete }) => {
    const [employeeData, setEmployeeData] = useState<Employee>(employee);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEmployeeData({ ...employeeData, [name]: value });
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(employeeData);
      //setEmployeeData(employee); // Reset form fields after submission
    };
  
    return (
        <div className="add-employee-form">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Add/Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Employee ID
                <input type="text" name="employeeId" value={employeeData?.employeeId || ''} onChange={handleChange} />
                </label>
                <label>
                Name
                <input type="text" name="name" value={employeeData?.name || ''} onChange={handleChange} />
                </label>
                <label>
                Title
                <input type="text" name="title" value={employeeData?.title || ''} onChange={handleChange} />
                </label>
                <label>
                Department Name
                <input type="text" name="departmentName" value={employeeData?.departmentName || ''} onChange={handleChange} />
                </label>
                <label>
                Phone Number
                <input type="text" name="phoneNumber" value={employeeData?.phoneNumber || ''} onChange={handleChange} />
                </label>
                <label>
                Email
                <input type="email" name="email" value={employeeData?.email || ''} onChange={handleChange} />
                </label>
                <button style={{ marginRight: "10px" }} type="submit">{employee ? 'Save Changes' : 'Add Employee'}</button>
                <button style={{ marginLeft: "10px" }} type="button" onClick={onDelete}>Delete</button>
            </form>
        </div>
    );
};
  
export default AddEmployeeForm;