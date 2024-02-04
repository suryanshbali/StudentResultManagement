
from django.urls import path
from .views import *


app_name = "studentmgmt"

urlpatterns = [
    path('students', get_all_students, name='get_all_students'),
    path('students/add', add_student, name='add_student'),
    path('students/delete/<int:studentid>', delete_student, name='delete_student'),

    path('courses', get_all_courses, name='get_all_courses'),
    path('courses/add', add_course, name='add_course'),
    path('courses/delete/<int:courseid>', delete_course, name='delete_course'),
    
    path('results', get_all_results, name='get_all_results'),
    path('results/add', add_result, name='add_result')
]