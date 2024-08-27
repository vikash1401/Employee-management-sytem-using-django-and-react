import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/employees/')
            .then(response => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/employees/${id}/`)
            .then(response => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => console.error('Error deleting employee: ', error));
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Employee List</h2>
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Experience</th>
                            <th>Designation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.experience} years</td>
                                <td>{employee.designation}</td>
                                <td>
                                    <Button 
                                        variant="warning" 
                                        className="me-2"
                                        as={Link} 
                                        to={`/update/${employee.id}`}
                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        variant="danger"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default EmployeeList;

