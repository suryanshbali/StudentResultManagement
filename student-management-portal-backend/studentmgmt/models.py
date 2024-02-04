from django.db import models

class Student(models.Model):
    first_name = models.CharField(max_length=200)
    family_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    email_address = models.EmailField(max_length=200)
    
    def __str__(self) -> str:
        return self.first_name + " " + self.family_name


class Course(models.Model):
    course_name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.course_name
    
class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    score = models.CharField(max_length=1)