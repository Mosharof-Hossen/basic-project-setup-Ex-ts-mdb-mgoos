import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
      'string.pattern.base': '{#value} is not capitalized',
    }),
  middleName: Joi.string().optional().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': '{#value} is not valid',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().trim().messages({
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().trim().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().trim().messages({
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().required().trim().messages({
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().trim().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().trim().messages({
    'string.empty': "Mother's contact number is required",
  }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's address is required",
  }),
});

const JoiStudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Student password is required',
  }),
  name: userNameSchema.required().messages({
    'object.base': 'Student name is required',
  }),
  gender: Joi.string().required().valid('female', 'male').messages({
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be either "female" or "male"',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().required().trim().email().messages({
    'string.empty': 'Email is required',
    'string.email': '{#value} is invalid',
  }),
  contactNo: Joi.string().required().trim().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().trim().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .messages({
      'any.only': 'Invalid blood group',
    }),
  presentAddress: Joi.string().required().trim().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().trim().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianSchema.required().messages({
    'object.base': 'Guardian information is required',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'object.base': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'inActive')
    .default('active')
    .messages({
      'any.only': 'isActive must be either "active" or "inActive"',
    }),
});

export default JoiStudentValidationSchema;
