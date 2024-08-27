import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        designation: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/employees/${id}/`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => console.error('Error fetching employee data: ', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/employees/${id}/`, employee)
            .then(response => {
                setMessage('Employee updated successfully!');
                setMessageType('success');
                setTimeout(() => navigate('/'), 2000);
            })
            .catch(error => {
                setMessage('Error updating employee.');
                setMessageType('danger');
                console.error('Error updating employee: ', error);
            });
    };

    return (
        <Container className="mt-4">
            <h2>Update Employee</h2>
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
                    Update Employee
                </Button>
            </Form>
        </Container>
    );
};

export default EmployeeUpdate;
