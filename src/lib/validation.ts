import Joi from "joi";

// Contact form validation schema
export const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s\-'\.]+$/)
    .required()
    .messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 100 characters",
      "string.pattern.base": "Name contains invalid characters",
      "any.required": "Name is required",
    }),

  email: Joi.string().email().max(255).required().messages({
    "string.email": "Please provide a valid email address",
    "string.max": "Email cannot exceed 255 characters",
    "any.required": "Email is required",
  }),

  company: Joi.string()
    .max(200)
    .allow("")
    .pattern(/^[a-zA-Z0-9\s\-'\.&,]+$/)
    .messages({
      "string.max": "Company name cannot exceed 200 characters",
      "string.pattern.base": "Company name contains invalid characters",
    }),

  service: Joi.string().max(100).allow("").messages({
    "string.max": "Service selection cannot exceed 100 characters",
  }),

  budget: Joi.string().max(50).allow("").messages({
    "string.max": "Budget selection cannot exceed 50 characters",
  }),

  timeline: Joi.string().max(50).allow("").messages({
    "string.max": "Timeline selection cannot exceed 50 characters",
  }),

  message: Joi.string().min(10).max(5000).required().messages({
    "string.min": "Message must be at least 10 characters long",
    "string.max": "Message cannot exceed 5000 characters",
    "any.required": "Message is required",
  }),

  // Bot protection fields
  // Honeypot field - should always be empty for legitimate submissions
  honeypot: Joi.string().allow("").max(500).optional().messages({
    "string.max": "Invalid field value",
  }),

  // Form start timestamp - used to detect bots that submit too quickly
  formStartTime: Joi.number().integer().positive().optional().messages({
    "number.base": "Invalid form data",
    "number.integer": "Invalid form data",
    "number.positive": "Invalid form data",
  }),
});

// Career application validation schema
export const careerSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s\-'\.]+$/)
    .required()
    .messages({
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name contains invalid characters",
      "any.required": "First name is required",
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s\-'\.]+$/)
    .required()
    .messages({
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot exceed 50 characters",
      "string.pattern.base": "Last name contains invalid characters",
      "any.required": "Last name is required",
    }),

  email: Joi.string().email().max(255).required().messages({
    "string.email": "Please provide a valid email address",
    "string.max": "Email cannot exceed 255 characters",
    "any.required": "Email is required",
  }),

  location: Joi.string().min(2).max(100).required().messages({
    "string.min": "Location must be at least 2 characters long",
    "string.max": "Location cannot exceed 100 characters",
    "any.required": "Location is required",
  }),

  linkedinUrl: Joi.string().uri().max(500).required().messages({
    "string.uri": "Please provide a valid LinkedIn URL",
    "string.max": "LinkedIn URL cannot exceed 500 characters",
    "any.required": "LinkedIn URL is required",
  }),

  currentTitle: Joi.string().min(2).max(100).required().messages({
    "string.min": "Current title must be at least 2 characters long",
    "string.max": "Current title cannot exceed 100 characters",
    "any.required": "Current title is required",
  }),

  yearsExperience: Joi.string().max(50).required().messages({
    "string.max": "Years of experience cannot exceed 50 characters",
    "any.required": "Years of experience is required",
  }),

  expertiseArea: Joi.string().max(100).required().messages({
    "string.max": "Expertise area cannot exceed 100 characters",
    "any.required": "Expertise area is required",
  }),

  primarySkills: Joi.array()
    .items(Joi.string().max(100))
    .min(1)
    .max(20)
    .required()
    .messages({
      "array.min": "At least one primary skill is required",
      "array.max": "Cannot exceed 20 primary skills",
      "any.required": "Primary skills are required",
    }),

  availabilityType: Joi.string().max(50).required().messages({
    "string.max": "Availability type cannot exceed 50 characters",
    "any.required": "Availability type is required",
  }),

  preferredRate: Joi.string().max(50).required().messages({
    "string.max": "Preferred rate cannot exceed 50 characters",
    "any.required": "Preferred rate is required",
  }),

  timeZone: Joi.string().max(50).required().messages({
    "string.max": "Time zone cannot exceed 50 characters",
    "any.required": "Time zone is required",
  }),

  previousExperience: Joi.string().min(10).max(2000).required().messages({
    "string.min": "Previous experience must be at least 10 characters long",
    "string.max": "Previous experience cannot exceed 2000 characters",
    "any.required": "Previous experience is required",
  }),

  remoteExperience: Joi.string().min(10).max(1000).required().messages({
    "string.min": "Remote experience must be at least 10 characters long",
    "string.max": "Remote experience cannot exceed 1000 characters",
    "any.required": "Remote experience is required",
  }),

  clientFacingExperience: Joi.string().min(10).max(1000).required().messages({
    "string.min":
      "Client-facing experience must be at least 10 characters long",
    "string.max": "Client-facing experience cannot exceed 1000 characters",
    "any.required": "Client-facing experience is required",
  }),

  privacyConsent: Joi.boolean().valid(true).required().messages({
    "any.only": "Privacy consent is required",
    "any.required": "Privacy consent is required",
  }),

  termsAgreement: Joi.boolean().valid(true).required().messages({
    "any.only": "Terms agreement is required",
    "any.required": "Terms agreement is required",
  }),
  // Bot protection fields (optional)
  honeypot: Joi.string().allow("").max(500).optional().messages({
    "string.max": "Invalid field value",
  }),

  formStartTime: Joi.number().integer().positive().optional().messages({
    "number.base": "Invalid form data",
    "number.integer": "Invalid form data",
    "number.positive": "Invalid form data",
  }),
});

// Validation helper function
export function validateInput<T>(
  schema: Joi.ObjectSchema<T>,
  data: unknown
): {
  error?: string;
  value?: T;
} {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join("; ");
    return { error: errorMessage };
  }

  return { value };
}
