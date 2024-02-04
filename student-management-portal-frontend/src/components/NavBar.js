import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar
} from '@mui/material';

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Add any app bar content here */}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" anchor="left">
            <List>
                  <ListItem component={Link} to="/">
                        <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem component={Link} to="/add-student">
                        <ListItemText primary="Add Student" />
                  </ListItem>
                  <ListItem component={Link} to="/students-list">
                        <ListItemText primary="Students List" />
                  </ListItem>
                  <ListItem component={Link} to="/add-course">
                        <ListItemText primary="Add Course" />
                  </ListItem>
                  <ListItem component={Link} to="/course-list">
                        <ListItemText primary="Course List" />
                  </ListItem>
                  <ListItem component={Link} to="/add-result">
                        <ListItemText primary="Add Result" />
                  </ListItem>
                  <ListItem component={Link} to="/result-list">
                        <ListItemText primary="Result List" />
                  </ListItem>
            </List>
      </Drawer>
    </>
  );
};

export default Navbar;
