from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from studentmgmt.models import Student
from studentmgmt.serializer import StudentSerializer
from studentmgmt.helper import validate_age, validate_date_of_birth, validate_email

# student APIs
@csrf_exempt
@api_view(['GET'])
def get_all_students(request):
    try:
        all_students = Student.objects.all()
        serialized_data = StudentSerializer(all_students, many=True).data
        return Response({"message": "Successful", "data": serialized_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def add_student(request):
    try:
        first_name = request.data.get("first_name")
        family_name = request.data.get("family_name")
        date_of_birth = request.data.get("date_of_birth")
        email_address = request.data.get("email_address")

        if not first_name or not family_name or not date_of_birth or not email_address:
            return Response({"message": "Please provide all the valid information"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Validate date of birth
        dob_datetime = validate_date_of_birth(date_of_birth)
        if not dob_datetime:
            return Response({"message": "Invalid date format. Please provide a valid date in the format YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate age >= 10
        age = validate_age(dob_datetime)
        if age < 10:
            return Response({"message": "Invalid age. Age must be greater than or equal to 10."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate email address format using regex
        if not validate_email(email_address):
            return Response({"message": "Invalid email address format."}, status=status.HTTP_400_BAD_REQUEST)

        students = Student.objects.filter(email_address__iexact=email_address)
        if students.exists():
            return Response({"message": "Student with provided email address already exists."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        new_student = Student.objects.create(
            first_name=first_name,
            family_name=family_name,
            date_of_birth=date_of_birth,
            email_address=email_address
        )

        serialized_data = StudentSerializer(new_student).data
        return Response({"message": "Student added successfully", "data": serialized_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['DELETE'])
def delete_student(request, studentid):
    try:
        if not studentid:
            return Response({"message": "No Student Id Found."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        student = Student.objects.get(id=studentid)
        if not student:
            return Response({"message": "No Student Record Found with given Id."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        student.delete()
        return Response({"message": "Student deleted successfully", "Deleted Student Id": studentid}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
