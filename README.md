# CampusMate LK

> Phase 4 update: Semester Management is implemented.

> Phase 5–7 update: Module management, variable-duration lecture sessions, and hour-based attendance are implemented. Modules support theory-only or theory-plus-practical required hours. Attendance is derived from present hours divided by conducted hours; it is never stored manually.

## Semester API

Every endpoint below requires the existing authentication cookie and is scoped to the signed-in user.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/semesters` | Create the user's active semester |
| GET | `/api/semesters` | List the user's semesters |
| GET | `/api/semesters/current` | Return the active semester, or `data: null` |
| GET | `/api/semesters/:id` | Get an owned semester |
| PATCH | `/api/semesters/:id` | Update semester details |
| PATCH | `/api/semesters/:id/complete` | Mark an active semester completed |
| DELETE | `/api/semesters/:id` | Delete a completed semester |

`academicYear`, `yearOfStudy`, and `semesterNumber` must be positive whole numbers. The server assigns `userId` from authentication and rejects a second active semester with HTTP 409. Active semesters cannot be deleted; complete them first. Run `npm run dev` in `server`, and `npm run dev` in `client`.

CampusMate LK is a free web application designed to help university students in Sri Lanka manage their academic activities, attendance, GPA, and academic reminders.

The project is being developed in multiple phases with a focus on clean architecture, scalability, security, and future mobile-app compatibility.

---

## 🚧 Project Development Status

### Phase 1 — Project Foundation
**Status: ✅ Completed**

Initial MERN project structure and development environment setup.

### Phase 2 — Database & Authentication
**Status: ✅ Completed**

Implemented the application's database foundation and student authentication system.

### Phase 3 — University & Academic Setup
**Status: ✅ Completed**

Implemented the academic profile and Sri Lankan university structure.

### Phase 4 — Semester Management
**Status: 🚧 In Progress**

Semester creation and management will be implemented next.

---

# Phase 2 — Database & Authentication

## Overview

Phase 2 established the backend database architecture and authentication system for CampusMate LK.

The application now supports authenticated student accounts using Google Login and stores user information securely in MongoDB Atlas.

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Google OAuth
- JWT
- HTTP-only authentication cookies
- dotenv
- CORS
- Helmet

## Implemented Features

### MongoDB Integration

Connected the Express backend to MongoDB Atlas using Mongoose.

Architecture:

```text
React Frontend
      ↓
Express Backend
      ↓
Mongoose
      ↓
MongoDB Atlas
