from datetime import datetime
import re

def validate_date_of_birth(date_of_birth):
    date_formats = ["%Y-%m-%d", "%d-%m-%Y", "%m/%d/%Y", "%d/%m/%Y", "%Y%m%d", "%d%m%Y", "%m%d%Y"]

    for date_format in date_formats:
        try:
            dob_datetime = datetime.strptime(date_of_birth, date_format)
            return dob_datetime
        except ValueError:
            continue

    return None


def validate_age(dob_datetime):
    today = datetime.now()
    age = today.year - dob_datetime.year - ((today.month, today.day) < (dob_datetime.month, dob_datetime.day))
    return age

def validate_email(email_address):
    # Use regex for a basic email format validation
    email_regex = r'^\S+@\S+\.\S+$'
    return re.match(email_regex, email_address)