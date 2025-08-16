# Amrutam Doctor Consultation API Documentation

## Base URL Locally
```
http://localhost:8000
```

## Authentication
All protected routes require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Rate Limiting
- 100 requests per IP per 15 minutes
- Status 429 returned when exceeded

## Error Responses
```json
{
  "error": "Error description",
  "status": 400
}
```

## API Endpoints

### 1. User Management

#### Register User
```http
POST /register
```
**Request:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response:** `201 Created`
```json
{
  "msg": "User registered successfully"
}
```

#### Login User
```http
POST /login
```
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:** `200 OK`
```json
{
  "msg": "User logged in successfully",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "jwt_token"
}
```

### 2. Doctor Management

#### Register Doctor
```http
POST /doctors/register
```
**Request:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "specialization": "string",
  "mode": "online|in-person",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "pincode": "string"
  },
  "consultationFee": "number",
  "availability": {
    "monday": { "start": "HH:mm", "end": "HH:mm", "available": "boolean" },
    "tuesday": { "start": "HH:mm", "end": "HH:mm", "available": "boolean" }
    // ... other days
  }
}
```
**Response:** `201 Created`

#### Get All Doctors
```http
GET /doctors
```
**Query Parameters:**
- specialization (optional): Filter by specialization
- mode (optional): "online" or "in-person"
- sortByAvailability (optional): "true" to sort by earliest availability

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "specialization": "string",
    "mode": "string",
    "consultationFee": "number",
    "nextFreeAt": "date" // when sortByAvailability=true
  }
]
```

### 3. Appointment Management

#### Get Available Slots
```http
GET /appointments/doctor/:doctorId/available-slots
```
**Query Parameters:**
- date: "YYYY-MM-DD"

**Response:** `200 OK`
```json
{
  "availableSlots": [
    {
      "start": "2023-08-17T09:00:00Z",
      "end": "2023-08-17T09:30:00Z"
    }
  ]
}
```

#### Reserve Appointment
```http
POST /appointments/reserve
```
**Request:**
```json
{
  "doctorId": "string",
  "appointmentDate": "date",
  "timeSlot": {
    "start": "date",
    "end": "date"
  },
  "mode": "online|in-person"
}
```
**Response:** `201 Created`
```json
{
  "appointmentId": "string",
  "expiresAt": "date" // 5-minute reservation window
}
```

#### Confirm Appointment
```http
POST /appointments/confirm/:appointmentId
```
**Request:**
```json
{
  "otpCode": "string" // Mock: "123456"
}
```
**Response:** `200 OK`

#### Get User Appointments
```http
GET /appointments/my-appointments
```
**Query Parameters:**
- status (optional): "booked", "completed", "cancelled"
- type (optional): "upcoming", "past"

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "doctorId": {
      "name": "string",
      "specialization": "string"
    },
    "appointmentDate": "date",
    "timeSlot": {
      "start": "date",
      "end": "date"
    },
    "status": "string",
    "mode": "string"
  }
]
```

#### Reschedule Appointment
```http
PATCH /appointments/reschedule/:appointmentId
```
**Request:**
```json
{
  "newDate": "date",
  "newTimeSlot": {
    "start": "date",
    "end": "date"
  },
  "reason": "string"
}
```
**Response:** `200 OK`

#### Cancel Appointment
```http
PATCH /appointments/cancel/:appointmentId
```
**Request:**
```json
{
  "reason": "string"
}
```
**Response:** `200 OK`

## Business Rules
1. Slot reservation expires after 5 minutes if not confirmed
2. Appointments can only be rescheduled/cancelled >24 hours before appointment time
3. Each slot is 30 minutes long
4. Doctors can set recurring availability for each day of the week
5. Appointments require OTP confirmation (mock implementation)

## Models

### User
- name (required)
- email (required, unique)
- password (required, hashed)

### Doctor
- name (required)
- email (required, unique)
- password (required)
- specialization (required)
- mode (online/in-person)
- address
- consultationFee
- availability (weekly schedule)
- bookedSlots

### Appointment
- doctorId (required)
- userId (required)
- appointmentDate (required)
- timeSlot (start/end)
- status (reserved/confirmed/completed/cancelled)
- mode (online/in-person)
- consultationFee
- paymentStatus
- cancellationReason
- reschedulingHistory
