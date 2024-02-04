import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import AddStudent from './pages/AddStudent';
import StudentsList from './pages/StudentsList';
import Home from './pages/Home'; // Import the Home component
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CourseList from './pages/CourseList';
import AddCourse from './pages/AddCourse';
import AddResult from './pages/AddResult';
import ResultList from './pages/ResultList';

const theme = createTheme();

class App extends Component {
  constructor(props) {
    super(props);
    // Set up your state or any other initialization logic here
    
  }

  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route
                path="/add-student"
                element={<AddStudent />}
              />
              <Route
                path="/students-list"
                element={<StudentsList />}
              />
              <Route
                path="/add-course"
                element={<AddCourse />}
              />
              <Route
                path="/course-list"
                element={<CourseList />}
              />
              <Route
                path="/add-result"
                element={<AddResult />}
              />
              <Route
                path="/result-list"
                element={<ResultList />}
              />
              <Route path="/" element={<Home />} /> {/* New route for the Home page */}
              {/* Add other routes as needed */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
