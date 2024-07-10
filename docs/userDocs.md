# User Authentication and Management API Documentation

This documentation provides an overview of the API endpoints for user authentication and management.

## Table Of Content

- [Endpoint](#endpoints)
  - [Signup](#sign-up)
  - [Signin](#sign-in)
  - [Get all Users](#get-all-users)
  - [Get User By Id](#get-user-by-id)
  - [Create User](#create-user)
  - [Update User](#update-user-profile)
  - [Delete User](#delete-user)

## Endpoints

### Sign Up

**URL**: `/signup`

**Method**: `POST`

**Description**: Register a new user.

**Request Body**:

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "dateOfBirth": "1990-01-01",
  "phoneNumber": "+1234567890",
  "photo": "base64string",
  "profileDescription": "A brief description about the user",
  "facility": "Facility Name",
  "cadre": "Cadre Information",
  "firstTimeConsultationFee": 100,
  "followUpConsultationFee": 80,
  "availableTime": "9AM - 5PM",
  "annualLicense": "license123",
  "fullLicense": "fullLicense123",
  "nationalIdentification": "ID123456",
  "medicalIndustryInsurance": "Insurance Details",
  "lAndA": "Legal and Administrative Information",
  "role": "doctor"
}
```

**Response**:

- **201 Created**:
  ```json
  {
    "token": "jwt-token"
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "message": "User with this email already exists"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Sign In

**URL**: `/signin`

**Method**: `POST`

**Description**: Authenticate an existing user.

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:

- **200 OK**:
  ```json
  {
    "token": "jwt-token"
  }
  ```
- **401 Unauthorized**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Get All Users

**URL**: `/users`

**Method**: `GET`

**Description**: Retrieve a list of all users.

**Response**:

- **200 OK**:
  ```json
  [
    {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "dateOfBirth": "1990-01-01",
      "phoneNumber": "+1234567890"
    }
  ]
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Get User by ID

**URL**: `/users/me`

**Method**: `GET`

**Description**: Retrieve the authenticated user's details using the JWT token.

**Headers**:

- `Authorization`: `Bearer jwt_token` (required)

**Response**:

- **200 OK**:
  ```json
  {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "dateOfBirth": "1990-01-01",
    "phoneNumber": "+1234567890"
    // Other user fields...
  }
  ```
- **404 Not Found**:
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Create User

**URL**: `/users`

**Method**: `POST`

**Description**: Create a new user profile.

**Request Body**:

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "dateOfBirth": "1990-01-01",
  "phoneNumber": "+1234567890"
  // Other user fields...
}
```

**Response**:

- **201 Created**:
  ```json
  {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "dateOfBirth": "1990-01-01",
    "phoneNumber": "+1234567890"
    // Other user fields...
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Update User Profile

**URL**: `/users/:id`

**Method**: `PUT`

**Description**: Update an existing user's profile.

**Parameters**:

- `id` (required): The UUID of the user.

**Request Body**:

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "dateOfBirth": "1990-01-01",
  "phoneNumber": "+1234567890"
  // Other user fields...
}
```

**Response**:

- **200 OK**:
  ```json
  {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "dateOfBirth": "1990-01-01",
    "phoneNumber": "+1234567890"
    // Updated user fields...
  }
  ```
- **404 Not Found**:
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Delete User

**URL**: `/users/:id`

**Method**: `DELETE`

**Description**: Delete a user by their ID.

**Parameters**:

- `id` (required): The UUID of the user.

**Response**:

- **204 No Content**
- **404 Not Found**:
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Internal server error"
  }
  ```
