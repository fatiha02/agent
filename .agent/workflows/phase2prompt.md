---
description: 2
---

PHASE 2 OBJECTIVE:
Allow instructors to create courses (free & paid).

COURSE MODEL:
id
title
description
price (nullable)
isFree (boolean)
status (DRAFT | PENDING | PUBLISHED)
instructorId
createdAt

FEATURES:
- Instructor dashboard
- Create course
- Edit course
- Save as draft
- Submit for admin approval
- Show only PUBLISHED courses publicly

RULES:
- Instructor cannot publish directly
- Admin approval required

DELIVER:
1. Prisma schema updates
2. API routes / server actions
3. Instructor course creation UI
4. Course list page
5. Access control checks
