from .student_view import *
from .course_view import *
from .results_view import *

__all__ = (
   # student apis
   'get_all_students',
   'add_student',
   'delete_student',

    # course apis
    'get_all_courses',
    'add_course',
    'delete_course',
    
    # student apis
    'get_all_results',
    'add_result'

)