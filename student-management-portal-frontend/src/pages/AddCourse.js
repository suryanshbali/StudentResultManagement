import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import api from '../services/api';

const AddCourse = () => {
    const [courseName, setCourseName] = useState('');

    const handleSubmit = () => {
        // Add the course to the database
        api.addCourse({ course_name: courseName })
            .then((response) => {
                if (!response) return;
                console.log('New course added:', response);
            }
        );

        // Clear the form
        setCourseName('');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Course
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        label="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddCourse;
