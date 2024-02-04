import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Select, MenuItem, ListItemText , FormControl, InputLabel } from '@mui/material';
import api from '../services/api';

const AddResult = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [score, setScore] = useState('');

    useEffect(() => {
        api.getStudents().then((response) => {
            if (response) {
                setStudents(response.data);
            }
        });

        api.getCourses().then((response) => {
            if (response) {
                setCourses(response.data);
            }
        });
    }, []);

    const handleSubmit = () => {
        // Add the result to the database
        api.addResult({ student_id: studentId, course_id: courseId, score })
            .then((response) => {
                if (response) {
                    console.log('New result added:', response);
                }
            }
        );

        // Clear the form
        setStudentId('');
        setCourseId('');
        setScore('');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Result
                </Typography>
                <form>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="student-label">Student</InputLabel>
                        <Select
                            labelId="student-label"
                            id="student"
                            value={studentId}
                            label="Student"
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                        >
                            {students.map((student) => (
                                <MenuItem key={student.id} value={student.id}>
                                    <ListItemText primary={`${student.first_name} ${student.family_name}`} secondary={student.email_address} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="course-label">Course</InputLabel>
                        <Select
                            labelId="course-label"
                            id="course"
                            value={courseId}
                            label="Course"
                            onChange={(e) => setCourseId(e.target.value)}
                            required
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.course_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="score-label">Score</InputLabel>
                        <Select
                            labelId="score-label"
                            id="score"
                            value={score}
                            label="Score"
                            onChange={(e) => setScore(e.target.value)}
                            required
                        >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddResult;
