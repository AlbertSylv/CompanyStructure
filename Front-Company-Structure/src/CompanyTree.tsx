import { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import AddEmployeeForm from './AddEmployeeForm';
import { Employee } from './Employee';
import './App.css';

const emptyEmployee: Employee = {
  employeeId: '',
  name: '',
  title: '',
  email: '',
  depth: 0,
};

export const CompanyTree = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [treeData, setTreeData] = useState<any>({ name: 'Company Tree', children: [] }); // Initialize tree data
  
    const onSubmit = (employee: Employee, managerId: string) => {
        const existingEmployeeIndex = employees.findIndex(emp => emp.employeeId === employee.employeeId);

        if (existingEmployeeIndex !== -1) {
            // Employee already exists, update the existing one
            const updatedEmployees = [...employees];
            updatedEmployees[existingEmployeeIndex] = { ...employee, managerId }; // Update employee with new data and managerId
            setEmployees(updatedEmployees);
        } else {
            // Generate employee ID only if it's empty
            const employeeWithId = { ...employee };
            if (employeeWithId.employeeId === '') {
                employeeWithId.employeeId = generateEmployeeId();
            }
            
            // Set the managerId for the new employee
            employeeWithId.managerId = managerId;
            
            // Update employees state with the new employee
            setEmployees(prevEmployees => [...prevEmployees, employeeWithId]);
        }

        setShowForm(false); // Close the form after submission

    };

    const onClose = () => {
      // Close the form
      setShowForm(false);
    };
  
    const onDelete = () => {

      if (!selectedEmployee) return;

      // Remove the selected employee from the employees state
      setEmployees(prevEmployees => prevEmployees.filter(emp => emp.employeeId !== selectedEmployee.employeeId));
      setShowForm(false); // Close the form after deletion
      
    };

    const generateEmployeeId = (): string => {
        // Generate a random ID (for simplicity, you can use a library like uuid for a more robust solution)
        return Math.random().toString(36).substr(2, 9);
    };
  
    const handleNodeClick = (nodeData: any) => {
        // Do nothing if the root node is clicked
        if(nodeData.depth === 0) {return};

        if (nodeData.data?.internalData && nodeData.data.internalData?.employeeId) {

            const clickedEmployeeId = nodeData.data.internalData.employeeId;
    
            // Find the employee with the clicked ID
            const clickedEmployee = employees.find(emp => emp.employeeId === clickedEmployeeId);
    
            // If employee is found, set it as the selected employee
            if (clickedEmployee) {
                setSelectedEmployee(clickedEmployee);
                setShowForm(true); // Show the form after setting the selected employee
            }
        } else {
            setSelectedEmployee({
                ...emptyEmployee,
                depth: nodeData.depth - 1,
                managerId: nodeData?.parent?.data?.internalData && nodeData.parent.data?.internalData.employeeId ? nodeData.parent.data?.internalData.employeeId : 'root',
            });

            setShowForm(true); // Show the form after setting the selected employee
        }
    };
    

    useEffect(() => {
        // Function to generate tree data based on employees
        const generateTreeData = () => {
            let treeData: any = {
              name: 'Company Name',
              children: [],
            };
        
            // Group employees by depth
            let employeesByDepth: { [key: number]: Employee[] } = {};
            employees.forEach(emp => {
              if (!employeesByDepth[emp.depth]) {
                employeesByDepth[emp.depth] = [];
              }
              employeesByDepth[emp.depth].push(emp);
            });
        
            // Recursively create tree nodes for each depth level
            const generateNodes = (depth: number, managerId: string | null): any => {
                const nodes: any = [];
            
                // Filter employees by depth and managerId to only include those at the current level and reporting to the selected manager
                const employeesAtDepth = employees.filter(emp => emp.depth === depth && emp.managerId === managerId);
            
                // Loop through employees at the current depth and under the selected manager
                employeesAtDepth.forEach((emp) => {
                    // Generate child nodes recursively, passing the current employee's ID as the managerId
                    const childrenNodes = generateNodes(depth + 1, emp.employeeId);
            
                    // Push the employee node along with its children nodes
                    nodes.push({
                        name: emp.name,
                        
                        attributes: {
                            Title: emp.title,
                            
                        },
                        internalData: {
                            employeeId: emp.employeeId,
                            depth: emp.depth,
                        },
                        children: childrenNodes,
                    });
                });
            
                nodes.push({
                    name: '+', // Display '+' for the "Add employee" node
                });
                
            
                return nodes;
            };
            
        
            treeData.children = generateNodes(0, 'root');

            return treeData;
        };

        // Update tree data whenever employees change
        setTreeData(generateTreeData());
    }, [employees]);


    const translate = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };


  
    return (
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor:"#FFFF" }}>
        <Tree
          data={treeData} 
          translate={translate}
          orientation="vertical"
          collapsible={false}
          onNodeClick={handleNodeClick}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          
        />
        {showForm && (
          <AddEmployeeForm
            employee={selectedEmployee || emptyEmployee}
            onSubmit={onSubmit}
            onClose={onClose}
            onDelete={onDelete}
          />
        )}
      </div>
    );
};
