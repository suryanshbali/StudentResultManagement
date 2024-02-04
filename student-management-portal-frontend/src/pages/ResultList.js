import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, ListItemText } from '@mui/material';
import api from '../services/api';

const ResultList = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log('Fetching results');
        // Adjust the API call to get results
        api.getResults().then((response) => {
            if (!response) return;
            setResults(response.data);
        });
    }, []);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((result) => (
                                <TableRow key={result.id}>
                                    <TableCell>
                                        <ListItemText
                                            primary={`${result.student.first_name} ${result.student.family_name}`}
                                            secondary={result.student.email_address}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ListItemText
                                            primary={result.course.course_name}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ListItemText
                                            primary={result.score}
                                        />
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

export default ResultList;
