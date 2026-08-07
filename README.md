# CampusMate LK

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