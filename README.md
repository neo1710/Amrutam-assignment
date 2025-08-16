# Amrutam Doctor Consultation Platform

## Overview
A scalable Ayurvedic doctor consultation platform that enables users to discover doctors, book appointments, and manage consultations. This project was developed as part of the Amrutam Full Stack Developer assignment.

## Project Structure
```
amrutam-assignment/
├── frontend/          # React/Next.js application
├── backend/           # Node.js + Express server
├── database/         # Database migrations and schemas
├── docs/            # API documentation
└── README.md
```

## Tech Stack
- Frontend: React/Next.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- Deployment: Render/Vercel

## Key Features
- Doctor Discovery
  - Search by specialization
  - Filter by consultation mode (online/in-person)
  - Sort by earliest availability
- Appointment Booking
  - Real-time slot availability
  - 5-minute slot locking mechanism
  - OTP-based booking confirmation
- Appointment Management
  - View upcoming and past appointments
  - Reschedule/cancel appointments (24h prior)
  - Filter appointments by status
- Additional Features
  - Doctor dashboard with calendar view
  - Recurring availability management
  - API rate limiting
  - Responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database

### Installation
1. Clone the repository
```bash
git clone https://github.com/neo1710/amrutam-assignment.git
cd amrutam-assignment
```

2. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Environment Setup
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

### Running the Application
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## API Documentation
Detailed API documentation is available in the `/docs` directory or at the following endpoints:
- Swagger UI: `http://localhost:8000/api-docs`
- API Documentation: [API.md](./documentation/API.md)

## Scaling Considerations
For detailed information about how the platform can scale to handle 5,000 appointments/day across 1,000 doctors, refer to [SCALING.md](./documentation/SCALING.md)

## Testing
```bash
# Frontend Tests
cd frontend
npm test

# Backend Tests
cd backend
npm test
```

## CI/CD
The project uses GitHub Actions for:
- Automated testing
- Linting
- Deployment to staging/production

## Live Demo
- Frontend: [https://amrutam-consultation.vercel.app](https://amrutam-assignment-virid.vercel.app/)
- Backend: [https://amrutam-api.render.com](https://amrutam-assignment-3nui.onrender.com)