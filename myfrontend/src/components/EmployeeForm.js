import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        designation: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/employees/', employee)
            .then(response => {
                setMessage('Employee added successfully!');
                setMessageType('success');
                setEmployee({
                    name: '',
                    email: '',
                    phone: '',
                    experience: '',
                    designation: '',
                });
            })
            .catch(error => {
                setMessage('Error adding employee.');
                setMessageType('danger');
                console.error('Error adding employee: ', error);
            });
    };

    return (
        <Container className="mt-4">
            <h2>Add Employee</h2>
            {message && <Alert variant={messageType}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={employee.name} 
                        onChange={handleChange} 
                        placeholder="Enter name" 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        value={employee.email} 
                        onChange={handleChange} 
                        placeholder="Enter email" 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="phone" 
                        value={employee.phone} 
                        onChange={handleChange} 
                        placeholder="Enter phone number" 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formExperience">
                    <Form.Label>Experience (Years)</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="experience" 
                        value={employee.experience} 
                        onChange={handleChange} 
                        placeholder="Enter experience" 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formDesignation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="designation" 
                        value={employee.designation} 
                        onChange={handleChange} 
                        placeholder="Enter designation" 
                        required 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Employee
                </Button>
            </Form>
        </Container>
    );
};

export default EmployeeForm;
