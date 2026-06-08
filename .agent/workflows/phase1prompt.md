---
description: phase1
---

PHASE 1 OBJECTIVE:
Set up authentication and role-based access.

FEATURES:
- Next.js App Router setup
- Prisma + PostgreSQL
- User model with roles
- Signup & Login
- JWT-based auth using NextAuth
- Role-based route protection

USER MODEL:
id
name
email
password
role (ADMIN | INSTRUCTOR | STUDENT)
createdAt

REQUIREMENTS:
- Use bcrypt for password hashing
- Use middleware to protect routes
- Separate dashboards per role
- Minimal UI (Tailwind basic forms)

DELIVER:
1. Folder structure
2. Prisma schema
3. NextAuth config
4. Middleware for role protection
5. Login & Register pages
6. Role-based dashboard routing

DO NOT:
- Add email verification
- Add OAuth
- Add UI polish