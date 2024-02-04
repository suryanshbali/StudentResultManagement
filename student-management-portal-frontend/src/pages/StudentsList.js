import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';


const StudentsList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        api.getStudents().then((response) => {
            if (!response) return;
            setStudents(response.data);
        })
    }, []);



    const deleteStudent = async (studentId) => {
        try {
            await api.deleteStudent(studentId);
            setStudents(students.filter((student) => student.id !== studentId));
        } catch (error) {
            console.error('Error deleting student', error);
        }
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{`${student.first_name} ${student.family_name}`}</TableCell>
                                    <TableCell>{student.date_of_birth}</TableCell>
                                    <TableCell>{student.email_address}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteStudent(student.id)} color="error">
                                            <CloseIcon color='red' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default StudentsList;
