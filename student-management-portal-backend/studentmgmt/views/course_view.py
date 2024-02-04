from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from studentmgmt.models import Course
from studentmgmt.serializer import CourseSerializer

# course apis
@csrf_exempt
@api_view(['GET'])
def get_all_courses(request):
    try:
        all_courses = Course.objects.all()
        serialized_data = CourseSerializer(all_courses, many=True).data
        return Response({"message": "Successful", "data": serialized_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
def add_course(request):
    try:
        course_name = request.data.get("course_name")

        if not course_name:
            return Response({"message": "Please provide a valid course name"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        course = Course.objects.filter(course_name__iexact=course_name)
        if course.exists():
            return Response({"message": "Course with provided name already exists."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        new_course = Course.objects.create(course_name=course_name)
        serialized_data = CourseSerializer(new_course).data
        return Response({"message": "Course added successfully", "data": serialized_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['DELETE'])
def delete_course(request, courseid):
    try:
        if not courseid:
            return Response({"message": "No Course Id Found."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        course = Course.objects.get(id=courseid)
        if not course:
            return Response({"message": "No Course Record Found with given Id."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        course.delete()
        return Response({"message": "Course deleted successfully", "Deleted Course Id": courseid}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Something went wrong! Please try again later!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
