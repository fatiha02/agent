# Demo Course Setup Guide

This guide explains how to populate your e-learning platform with realistic demo courses for evaluation/demo purposes.

## Option 1: Quick Seed Script (Recommended)

The fastest way to get demo courses with realistic content.

### Run the seed script:

```bash
npm run seed:demo
```

This will create:
- ✅ 2 Demo Instructors (John Mitchell, Sarah Chen)
- ✅ 2 Demo Students (Alice Johnson, Bob Williams)
- ✅ 2 Complete Courses:
  - **Web Development Fundamentals** (6 lessons)
  - **Database Management with SQL** (5 lessons)
- ✅ 3 Sample Enrollments

### Demo Credentials:

**Instructors:**
- Email: `john.instructor@demo.com` / Password: `password123`
- Email: `sarah.instructor@demo.com` / Password: `password123`

**Students:**
- Email: `alice.student@demo.com` / Password: `password123`
- Email: `bob.student@demo.com` / Password: `password123`

---

## Option 2: Bulk Upload API (For Custom Courses)

Use this if you want to add your own courses programmatically.

### Endpoint:
```
POST /api/admin/bulk-upload
```

### Authentication:
You must be logged in as an **ADMIN** user.

### Request Format:

```json
{
  "courseTitle": "Python Programming Basics",
  "description": "Learn Python from scratch with hands-on examples",
  "thumbnail": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
  "category": "Programming",
  "isFree": true,
  "price": 0,
  "instructorId": "YOUR_INSTRUCTOR_MONGODB_ID",
  "lessons": [
    {
      "title": "Introduction to Python",
      "videoUrl": "https://www.youtube.com/watch?v=kqtD5dpn9C8",
      "duration": 420
    },
    {
      "title": "Variables and Data Types",
      "videoUrl": "https://www.youtube.com/watch?v=LKYdTEfQkOc",
      "duration": 360
    },
    {
      "title": "Control Flow - If/Else",
      "videoUrl": "https://www.youtube.com/watch?v=AWek49wXGzI",
      "duration": 480
    }
  ]
}
```

### Using cURL:

```bash
curl -X POST http://localhost:3000/api/admin/bulk-upload \
  -H "Content-Type: application/json" \
  -H "Cookie: YOUR_SESSION_COOKIE" \
  -d '{
    "courseTitle": "Python Basics",
    "description": "Learn Python programming",
    "instructorId": "INSTRUCTOR_ID_HERE",
    "lessons": [
      { "title": "Intro", "videoUrl": "https://video1", "duration": 300 },
      { "title": "Variables", "videoUrl": "https://video2", "duration": 420 }
    ]
  }'
```

### Using Postman:
1. Login as admin to get session cookie
2. Create POST request to `/api/admin/bulk-upload`
3. Set Content-Type to `application/json`
4. Paste JSON body
5. Send request

### Response:

**Success:**
```json
{
  "success": true,
  "message": "Course created successfully with 3 lessons",
  "data": {
    "courseId": "65f8a9b2c3d4e5f6a7b8c9d0",
    "courseTitle": "Python Programming Basics",
    "lessonsCreated": 3
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Unauthorized. Admin access required."
}
```

---

## Getting Instructor IDs

To use the bulk upload API, you need an instructor's MongoDB ID:

### Method 1: From Seed Script Output
After running `npm run seed:demo`, check the console output for instructor IDs.

### Method 2: Query Database
```javascript
// In MongoDB shell or Compass
db.users.find({ role: "INSTRUCTOR" })
```

### Method 3: From Admin Panel
Login as admin → Users page → Copy instructor ID from the table

---

## Video URL Sources

You can use:
- **YouTube**: `https://www.youtube.com/watch?v=VIDEO_ID`
- **Vimeo**: `https://vimeo.com/VIDEO_ID`
- **Cloudinary**: Your uploaded video URLs
- **Any public video URL**

### Free Educational Videos:
- freeCodeCamp YouTube channel
- Traversy Media
- Programming with Mosh
- The Net Ninja

---

## Tips for Demo/Evaluation

1. **Run seed script first** - gives you a complete working demo
2. **Use real YouTube videos** - looks more professional than placeholder content
3. **Keep courses focused** - 2-3 courses with 4-6 lessons each is perfect
4. **Match your project** - Web Dev + Database courses show you understand your own tech stack
5. **Test enrollment flow** - login as student and enroll in courses before demo

---

## Troubleshooting

**"Unauthorized" error:**
- Make sure you're logged in as ADMIN
- Check your session cookie is being sent

**"Missing required fields" error:**
- Verify JSON format matches the example
- Check `courseTitle`, `instructorId`, and `lessons` are present

**Lessons not showing:**
- Verify `videoUrl` is a valid URL
- Check `order` field is sequential (auto-generated if not provided)

---

## Next Steps

After seeding:
1. Login as instructor to see the courses
2. Login as student to test enrollment
3. Login as admin to see the dashboard
4. Test video playback
5. Check progress tracking

Your platform is now ready for demonstration! 🚀
