import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log('Fetching courses')
        // Adjust the API call to get courses
        api.getCourses().then((response) => {
            if (!response) return;
            setCourses(response.data);
        });
    }, []);

    const deleteCourse = async (courseId) => {
        try {
            await api.deleteCourse(courseId);
            setCourses(courses.filter((course) => course.id !== courseId));
        } catch (error) {
            console.error('Error deleting course', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.course_name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteCourse(course.id)} color="error">
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

export default CourseList;
