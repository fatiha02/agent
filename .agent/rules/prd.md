---
trigger: always_on
---

1. Product Overview
Product Name

(Working name): EduMarket

Product Vision

Build a centralized e-learning marketplace where instructors create courses, students enroll and learn, and the platform owner fully controls payments, access, and quality.

Goals (MVP)

Enable instructors to publish free and paid courses

Allow students to enroll, watch lessons, and track progress

Centralize payments through the platform owner

Deliver a scalable, secure foundation for future growth

2. User Roles & Permissions
1️⃣ Platform Owner (Admin)

Capabilities

Approve / reject instructors

Review and approve courses

Control pricing & revenue

Manage users (ban, suspend)

View platform analytics

Control payouts

2️⃣ Instructor

Capabilities

Register & authenticate

Create and manage courses

Upload video lessons

Set course price (or mark free)

View student enrollments

Track course performance

Restrictions

Cannot access payment system directly

Cannot publish without admin approval

3️⃣ Student

Capabilities

Register & authenticate

Browse courses

Enroll in free or paid courses

Watch lessons

Track learning progress

Resume from last watched lesson

3. MVP Feature Scope
3.1 Authentication & Authorization
Requirements

Role-based authentication (Student / Instructor / Admin)

Secure login & signup

JWT-based session management

Functional Requirements

User registration with role selection

Login & logout

Protected routes based on role

Password reset (optional for MVP)

Tech Notes

NextAuth / Custom JWT auth

Role stored in DB

Middleware for route protection

3.2 Course Creation (Instructor)
Requirements

Instructors can create courses

Courses can be Free or Paid

Course Fields

Title

Description

Category

Thumbnail

Price (₹ or $)

Course status (Draft / Pending Approval / Published)

Instructor ID

Functional Flow

Instructor creates course

Course saved as Draft

Instructor submits for review

Admin approves → course published

3.3 Video Lessons
Requirements

Courses consist of multiple lessons

Each lesson contains a video

Lesson Fields

Lesson title

Video URL

Duration

Order/index

Course ID

Functional Requirements

Upload or link video

Stream videos securely

Restrict access to enrolled users only

Tech Notes

Video hosting: Cloudinary / AWS S3 / Vimeo

Do not self-host videos on server

3.4 Course Enrollment
Requirements

Students can enroll in courses

Enrollment rules differ for free vs paid

Enrollment Flow

Free Course

Click “Enroll”

Immediate access

Paid Course

Redirect to payment

Payment success → enroll student

Enrollment Data

Student ID

Course ID

Enrollment date

Payment status

3.5 Payments (Platform Controlled)
Requirements

Platform owner controls all payments

Support paid courses

Functional Requirements

Secure checkout

Payment verification

Enrollment only after payment success

Tech Notes

Stripe / Razorpay

Webhooks to confirm payment

Platform receives payment → instructor payouts later (manual for MVP)

3.6 Learning Progress Tracking
Requirements

Track how much of the course a student completed

Progress Rules

Lesson marked complete when video ends (or manual check)

Course progress = completed lessons / total lessons

Data Model

Student ID

Course ID

Lesson ID

Completion status

Last watched timestamp

Functional Requirements

Resume video where left off

Show progress bar per course

Show completed lessons

4. Admin (Platform Owner) Panel
Features

View all users

Approve / reject instructors

Approve / reject courses

View payments

Disable courses/users

MVP Admin Pages

Dashboard

Users list

Courses approval

Payments overview

5. Non-Functional Requirements
Performance

Video loading < 3 seconds

Page load < 2 seconds

Security

HTTPS only

Secure payment handling

Protected video access

Role-based authorization

Scalability

Stateless backend

Cloud storage for videos

Modular architecture

6. Tech Stack (Suggested)
Frontend

Next.js (App Router)

Tailwind CSS

React Query / Zustand

Backend

Next.js API routes

Node.js

Prisma ORM

Database

PostgreSQL / MongoDB

Auth

NextAuth / Custom JWT

Payments

Stripe / Razorpay

Video

Cloudinary / AWS S3