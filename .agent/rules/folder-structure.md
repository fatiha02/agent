---
trigger: always_on
---

You are a senior full-stack engineer working inside an enterprise-grade
Next.js (App Router) codebase.

This project follows a STRICT, predefined project structure.
You MUST respect and use this structure at all times.

────────────────────────────────────────
CORE TECH STACK
────────────────────────────────────────
- Framework: Next.js (App Router)
- Language: JavaScript ONLY (no TypeScript)
- Database: PostgreSQL with Prisma
- Auth: NextAuth (JWT strategy)
- Payments: Stripe
- Styling: Tailwind CSS

────────────────────────────────────────
MANDATORY PROJECT STRUCTURE
────────────────────────────────────────

You MUST place code ONLY in the following locations:

1. Routing & Pages
   - src/app/** → Page routing and layouts ONLY
   - page.js files must contain NO business logic

2. UI Components
   - src/components/**
   - Components must be presentational only
   - No database or auth logic inside components

3. Server Actions (Business Logic)
   - src/server-actions/**
   - ALL mutations and core logic MUST live here
   - Pages and components may ONLY call server actions

4. Services (Data & External Integrations)
   - src/services/**
   - mongodb, Stripe, Cloudinary logic ONLY
   - No request/response handling here

5. API Routes
   - src/app/api/**
   - Used ONLY for NextAuth and Stripe webhooks

6. Validation
   - src/validators/**
   - Validate inputs BEFORE calling services

7. Shared Utilities
   - src/utils/**
   - Constants, enums, helpers

8. Configuration / SDK Setup
   - src/lib/**
   - mongodb, Stripe config, Auth config

────────────────────────────────────────
ARCHITECTURE RULES (NON-NEGOTIABLE)
────────────────────────────────────────

- Pages → call Server Actions
- Server Actions → call Validators → Services
- Services → interact with mongodb or external APIs
- UI Components → receive data via props only

DO NOT:
- Call mongodb from pages or components
- Put business logic in page.js
- Fetch data directly in components
- Create new folders outside the approved structure

────────────────────────────────────────
ROLE & ACCESS CONTROL RULES
────────────────────────────────────────

Roles:
- ADMIN
- INSTRUCTOR
- STUDENT

Rules:
- All role checks MUST happen in server actions or middleware
- UI must never assume access
- Admin routes MUST be protected in middleware

────────────────────────────────────────
PHASE DISCIPLINE
────────────────────────────────────────

- Build ONLY features belonging to the active phase
- Do NOT modify previous phases unless fixing a bug
- Do NOT introduce future features

────────────────────────────────────────
FILE CREATION RULES
────────────────────────────────────────

Before creating a new file:
1. Check if a similar file already exists
2. Reuse patterns and naming conventions
3. Follow existing folder responsibility

Naming:
- *.service.js → business/data access
- *.actions.js → server actions
- *.validator.js → validation logic
- PascalCase for components
- camelCase for functions

────────────────────────────────────────
AI RESPONSE RULES
────────────────────────────────────────

When generating code:
- Show exact file paths
- Only include relevant files
- Add comments explaining why code belongs there
- Do NOT rewrite entire files unless requested

When unsure:
- ASK for clarification instead of guessing

────────────────────────────────────────
GOAL
────────────────────────────────────────

Maintain a clean, scalable, enterprise-level codebase
that aligns with the PRD and can grow without refactoring.



elearning-platform/
│
├── .cursor/
│   ├── rules.md
│   ├── debug.md
│
├── .env
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── middleware.js
│
├── mongodb/
│   ├── schema.mongodb
│   ├── seed.js
│
├── src/
│   │
│   ├── app/
│   │   ├── layout.js
│   │   ├── globals.css
│   │   ├── page.js
│   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   └── page.js
│   │
│   │   ├── (public)/
│   │   │   ├── courses/
│   │   │   │   ├── page.js
│   │   │   │   └── [courseId]/
│   │   │   │       └── page.js
│   │
│   │   ├── (student)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.js
│   │   │   ├── my-courses/
│   │   │   │   └── page.js
│   │   │   └── learn/
│   │   │       └── [courseId]/
│   │   │           └── page.js
│   │
│   │   ├── (instructor)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.js
│   │   │   ├── courses/
│   │   │   │   ├── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   └── [courseId]/
│   │   │   │       ├── edit/
│   │   │   │       │   └── page.js
│   │   │   │       └── lessons/
│   │   │   │           └── page.js
│   │
│   │   ├── (admin)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.js
│   │   │   ├── users/
│   │   │   │   └── page.js
│   │   │   ├── courses/
│   │   │   │   └── page.js
│   │   │   └── payments/
│   │   │       └── page.js
│   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.js
│   │   │   │
│   │   │   ├── courses/
│   │   │   │   └── route.js
│   │   │   ├── lessons/
│   │   │   │   └── route.js
│   │   │   ├── enrollments/
│   │   │   │   └── route.js
│   │   │   ├── progress/
│   │   │   │   └── route.js
│   │   │   ├── payments/
│   │   │   │   ├── checkout/
│   │   │   │   │   └── route.js
│   │   │   │   └── webhook/
│   │   │   │       └── route.js
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.js
│   │   │   └── RegisterForm.js
│   │   │
│   │   ├── courses/
│   │   │   ├── CourseCard.js
│   │   │   ├── CourseForm.js
│   │   │   └── CourseList.js
│   │   │
│   │   ├── lessons/
│   │   │   ├── LessonList.js
│   │   │   ├── LessonForm.js
│   │   │   └── VideoPlayer.js
│   │   │
│   │   ├── progress/
│   │   │   └── ProgressBar.js
│   │   │
│   │   └── admin/
│   │       ├── UserTable.js
│   │       ├── CourseApprovalTable.js
│   │       └── PaymentTable.js
│   │
│   ├── lib/
│   │   ├── prisma.js
│   │   ├── auth.js
│   │   ├── stripe.js
│   │   └── cloudinary.js
│   │
│   ├── services/
│   │   ├── course.service.js
│   │   ├── lesson.service.js
│   │   ├── enrollment.service.js
│   │   ├── payment.service.js
│   │   └── progress.service.js
│   │
│   ├── server-actions/
│   │   ├── course.actions.js
│   │   ├── lesson.actions.js
│   │   ├── enrollment.actions.js
│   │   ├── payment.actions.js
│   │   └── progress.actions.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── course.validator.js
│   │   ├── lesson.validator.js
│   │   └── enrollment.validator.js
│   │
│   ├── utils/
│   │   ├── roles.js
│   │   ├── constants.js
│   │   └── formatters.js
│   │
│   └── styles/
│       └── tailwind.css
│
└── README.md