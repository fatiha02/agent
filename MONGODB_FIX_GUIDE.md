# MongoDB Atlas Connection Fix Guide

## Problem
Your seed script is failing with: `MongoServerError: bad auth : authentication failed`

This means your MongoDB Atlas username/password in `.env` is incorrect.

---

## Solution: Update MongoDB Credentials

### Step 1: Go to MongoDB Atlas
1. Open https://cloud.mongodb.com
2. Log in to your account
3. Select your project (e-learningplatform)

### Step 2: Create/Update Database User

#### Option A: Reset Existing User Password
1. Click **"Database Access"** in the left sidebar
2. Find user `alfalearn` in the list
3. Click **"Edit"** button
4. Click **"Edit Password"**
5. Choose one:
   - **Auto-generate Secure Password** (recommended) - Copy it!
   - **Create your own password** - Use simple password like `Test123456`
6. Click **"Update User"**
7. **IMPORTANT:** Copy the password immediately!

#### Option B: Create New User
1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `alfalearn` (or choose new name)
5. Password: Click **"Autogenerate Secure Password"** and **copy it**
6. Database User Privileges: Select **"Atlas admin"** or **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Whitelist Your IP Address
1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Choose one:
   - **"Add Current IP Address"** (recommended for security)
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - easier for testing but less secure
4. Click **"Confirm"**

### Step 4: Get Your Connection String
1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update Your .env File

Replace the `MONGODB_URI` line in your `.env` file with the new connection string:

**Format:**
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

**Example with your cluster:**
```env
MONGODB_URI=mongodb+srv://alfalearn:YOUR_NEW_PASSWORD@e-learningplatform.7qq0gwl.mongodb.net/alfalearning?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_NEW_PASSWORD` with the password you copied in Step 2
- Make sure there are NO spaces
- Make sure the database name is `alfalearning`

### Step 6: Test the Connection

Run the seed script:
```bash
npm run seed:demo
```

You should see:
```
🌱 Starting seed process...
✅ Connected to MongoDB
📚 Creating 10 courses with lessons...
✅ Seed completed successfully!
```

---

## Common Issues & Solutions

### Issue: Special Characters in Password
If your password contains special characters like `@`, `#`, `!`, `/`, you need to URL-encode them:

| Character | Encoded |
|-----------|---------|
| @         | %40     |
| #         | %23     |
| !         | %21     |
| /         | %2F     |
| :         | %3A     |

**Example:**
- Password: `Pass@123!`
- Encoded: `Pass%40123%21`

### Issue: Still Getting "bad auth"
1. Double-check username and password are correct
2. Make sure you updated the user in the correct project
3. Wait 1-2 minutes after creating/updating user (Atlas needs time to sync)
4. Try copying the connection string again from Atlas

### Issue: "IP not whitelisted"
1. Go to Network Access
2. Add your current IP or use 0.0.0.0/0

---

## Quick Fix (Easiest Method)

1. **MongoDB Atlas** → **Database** → **Connect**
2. **Connect your application**
3. **Copy the full connection string**
4. **Paste it in your `.env` file** as `MONGODB_URI`
5. **Replace `<password>`** with your actual password
6. **Add database name**: Change `/?retryWrites` to `/alfalearning?retryWrites`

---

## Need Help?

If you're still stuck, share:
1. The error message you're getting
2. Your connection string (with password hidden as `***`)

Example:
```
mongodb+srv://alfalearn:***@e-learningplatform.7qq0gwl.mongodb.net/alfalearning?retryWrites=true&w=majority
```
