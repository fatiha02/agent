---
description: 3
---

PHASE 3 OBJECTIVE:
Add video lessons to courses.

LESSON MODEL:
id
title
videoUrl
order
courseId

FEATURES:
- Instructor adds lessons
- Lesson ordering
- Video playback
- Only enrolled users can watch

RULES:
- Videos are external URLs only (Cloudinary/S3)
- Do NOT upload files to server

DELIVER:
1. Prisma schema updates
2. Lesson CRUD server actions
3. Lesson UI inside course
4. Secure video access logic
