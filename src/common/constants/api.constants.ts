export const API = {
  PREFIX: 'api',
  VERSION: 'v1',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const ERROR_MESSAGES = {
  RESOURCE_NOT_FOUND: (resource: string) => `${resource} not found.`,
  RESOURCE_CONFLICT: (resource: string) => `${resource} already exists.`,
  INVALID_INPUT: 'The provided input is invalid.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: {
    ACCESS_DENIED: 'Access Denied: You don\'t have sufficient permissions to {action} this resource. Required role: {required}, Current role: {current}',
    NOT_AUTHENTICATED: 'Access Denied: You must be logged in to access this resource',
  },
  SERVICE_UNAVAILABLE: (service: string) => 
    `${service} is currently unavailable. Please try again later.`,
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
} as const; 

// Define a reusable response schema object
export const USER_RESPONSE_PROPERTIES = {
  id: { type: 'string', example: '507f1f77bcf86cd799439011' },
  firstName: { type: 'string', example: 'John' },
  lastName: { type: 'string', example: 'Doe' },
  email: { type: 'string', example: 'test@test.com' },
  isEmailVerified: { type: 'boolean', example: true },
  role: { type: 'string', example: 'user' },
  phoneNumber: { type: 'string', example: '+1234567890' },
  isActive: { type: 'boolean', example: true },
  fullName: { type: 'string', example: 'John Doe' },
  createdAt: { type: 'string', example: '2024-03-20T10:00:00.000Z' },
  updatedAt: { type: 'string', example: '2024-03-20T10:00:00.000Z' }
} as const; 

// Add this response schema for unauthorized
export const UNAUTHORIZED_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    statusCode: { type: 'number', example: 401 },
    message: { type: 'string', example: 'You are not authorized to access this resource' },
    path: { type: 'string', example: '/users' },
    timestamp: { type: 'string', example: '2024-03-20T10:00:00.000Z' }
  }
} as const;