import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import api from '../services/api';

const AddStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        // Add the student to the database
        api.addStudent({ first_name: firstName, family_name: familyName, date_of_birth: dob, email_address: email })
            .then((response) => {
                if (!response) return;
                console.log('New student added:', response);
            }
        );

        // Clear the form
        setFirstName('');
        setFamilyName('');
        setDob('');
        setEmail('');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Student
                </Typography>
                <form >
                    <TextField
                        fullWidth
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Family Name"
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        value={dob}
                        placeholder='YYYY-MM-DD'
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container >
    );
};

export default AddStudent;
