import { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import AddEmployeeForm from './AddEmployeeForm';
import { Employee } from './Employee';

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
  
    const onSubmit = (employee: Employee) => {
        // Update employees state with the new employee
        setEmployees(prevEmployees => [...prevEmployees, employee]);
        setShowForm(false); // Close the form after submission

        console.log('Submitted employee:', employee);
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
  
    const handleNodeClick = (nodeData: any) => {
        // Logic to handle node click event and show form for adding/editing employee
        console.log('Clicked node:', nodeData);
      
        const depth = nodeData.depth;
      
        // For demonstration, let's set the selectedEmployee to an existing employee
        const employee: Employee = {
          employeeId: '', 
          name: 'John Doe',
          title: 'Software Engineer',
          email: 'john.doe@example.com',
          depth: depth,
        };
        setSelectedEmployee(employee);
      
        // Show the form
        setShowForm(true);
    };

    useEffect(() => {
        // Function to generate tree data based on employees
        const generateTreeData = () => {
            let treeData: any = {
              name: 'Company Tree',
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
            const generateNodes = (depth: number, parentId: string): any => {
              const nodes: any = [];
              console.log('Employees by depth:', employeesByDepth);
              if (employeesByDepth[depth]) {
                employeesByDepth[depth].forEach((emp, index) => {
                  const nodeId = `${parentId}-${index}`;
                  nodes.push({
                    name: emp.name,
                    attributes: {
                      employeeId: emp.employeeId,
                    },
                    nodeSvgShape: {
                      shape: 'circle',
                      shapeProps: {
                        r: 5,
                        fill: 'steelblue',
                      },
                    },
                    children: generateNodes(depth + 1, nodeId), // Recursively generate child nodes
                  });
                });
              }
              return nodes;
            };
        
            treeData.children = generateNodes(0, 'root');
            console.log('Generated tree data:', treeData)
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
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Tree
          data={treeData} // Use updated tree data
          translate={translate}
          orientation="vertical"
          onNodeClick={handleNodeClick} // Use onNodeClick event handler
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
