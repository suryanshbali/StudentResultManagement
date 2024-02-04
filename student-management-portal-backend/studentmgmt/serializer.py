# serializers.py
from rest_framework import serializers
from .models import Student, Course, Result

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'family_name', 'date_of_birth', 'email_address']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course_name']


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['student', 'course', 'score']
        depth = 1
        

