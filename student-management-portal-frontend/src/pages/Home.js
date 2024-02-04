import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ marginTop: 3 }}>
                Welcome to the Student Result Management System
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Please use the navigation on the left to perform various tasks.
            </Typography>
        </Container>
    );
};

export default Home;
