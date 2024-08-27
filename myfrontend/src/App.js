import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeUpdate from './components/EmployeeUpdate';
import { Container, Navbar } from 'react-bootstrap';
import { Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Employee Management System</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="mt-4">
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/add" element={<EmployeeForm />} />
                        <Route path="/update/:id" element={<EmployeeUpdate />} />
                    </Routes>
                </Container>
                <footer className="bg-dark text-white text-center py-3 mt-4">
                    <Container>
                        <Button variant="primary" href="/add" className="me-2">
                            Add Employee
                        </Button>
                        <Button variant="secondary" href="/">
                            Show Employees
                        </Button>
                    </Container>
                </footer>
            </div>
        </Router>
    );
}

export default App;

