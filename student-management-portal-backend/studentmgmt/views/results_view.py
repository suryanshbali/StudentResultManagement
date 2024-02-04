from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from studentmgmt.models import Result, Course, Student
from studentmgmt.serializer import ResultSerializer

# result APIs
@csrf_exempt
@api_view(['GET'])
def get_all_results(request):
    try:
        all_results = Result.objects.all().order_by('student', 'course', 'score')
        serialized_data = ResultSerializer(all_results, many=True).data
        return Response({"message": "Successful", "data": serialized_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def add_result(request):
    try:
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')
        score = request.data.get('score')

        if not student_id or not course_id or not score:
            return Response({"message": "Please provide all valid information"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        student_query = Student.objects.filter(id=student_id)
        if not student_query.exists():
            return Response({"message": "Student with provided Student ID not found"}, status=status.HTTP_404_NOT_FOUND)
        student = student_query.first()

        course_query = Course.objects.filter(id=course_id)
        if not course_query.exists():
            return Response({"message": "Course with provided Course ID not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        course = course_query.first()

        existing_result_query = Result.objects.filter(student=student, course=course)
        if existing_result_query.exists():
            return Response({"message": "Result already exists for the given student and course"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not (isinstance(score, str) and len(score) == 1 and 'A' <= score <= 'F' and score.isalpha()):
            return Response({"message": "Invalid score. Must be a single uppercase letter from A to F."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        new_result = Result.objects.create(
            student=student,
            course=course,
            score=score
        )

        if not new_result:
            return Response({"message": "Result Not Added"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serialized_data = ResultSerializer(new_result).data
        return Response({"message": "Successful", "data": serialized_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
