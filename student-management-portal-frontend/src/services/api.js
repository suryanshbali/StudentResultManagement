// ApiService.js
import axios from 'axios';
import NotificationService from './notificationService';


class ApiService {
    constructor() {
        this.API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your API base URL
        this.apiEndpoints = {
            getStudents: '/students',
            addStudent: '/students/add',
            deleteStudent: (studentId) => `/students/delete/${studentId}`,
            getCourses: '/courses',
            addCourse: '/courses/add',
            deleteCourse: (courseId) => `/courses/delete/${courseId}`,
            getResults: '/results',
            addResult: '/results/add',
        };

        // Include Django CSRF token in the Axios requests
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';


    }

    async handleResponse(response, notify = true) {
        try {
            const responseData = await response.data;
            console.log("responseData", responseData, response.status)
            const message = responseData.message || 'Operation successful'; // Default success message if not provided

            if (response.status >= 200 && response.status < 300) {
                notify && NotificationService.success("Successful", message);
            } else {
                NotificationService.error("Error", message);
            }

            return responseData;
        } catch (error) {
            NotificationService.error("Error", "Something went wrong! Please try again later");
        }
    }


    async getStudents() {
        try {
            const response = await axios.get(`${this.API_BASE_URL}${this.apiEndpoints.getStudents}`);
            const data = await this.handleResponse(response, false);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async addStudent(newStudent) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}${this.apiEndpoints.addStudent}`, newStudent);
            const data = await this.handleResponse(response);
            // showSuccessNotification('Successfully added a new student');
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async deleteStudent(studentId) {
        try {
            const response = await axios.delete(`${this.API_BASE_URL}${this.apiEndpoints.deleteStudent(studentId)}`);
            const data = await this.handleResponse(response);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async getCourses() {
        try {
            const response = await axios.get(`${this.API_BASE_URL}${this.apiEndpoints.getCourses}`);
            const data = await this.handleResponse(response, false);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async addCourse(newCourse) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}${this.apiEndpoints.addCourse}`, newCourse);
            const data = await this.handleResponse(response);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async deleteCourse(courseId) {
        try {
            const response = await axios.delete(`${this.API_BASE_URL}${this.apiEndpoints.deleteCourse(courseId)}`);
            const data = await this.handleResponse(response);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async getResults() {
        try {
            const response = await axios.get(`${this.API_BASE_URL}${this.apiEndpoints.getResults}`);
            const data = await this.handleResponse(response, false);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }

    async addResult(newResult) {
        try {
            console.log("newResult", newResult)
            const response = await axios.post(`${this.API_BASE_URL}${this.apiEndpoints.addResult}`, newResult);
            const data = await this.handleResponse(response);
            return data;
        } catch (error) {
            if (error.response) {
                await this.handleResponse(error.response);
            } else {
                console.error('Error', error.message);
            }
        }
    }


}

export default new ApiService();
