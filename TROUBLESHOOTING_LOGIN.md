# Login Troubleshooting Guide

## Issue: Unable to login on deployed application

### Root Cause
The admin user doesn't exist in your production MongoDB database. The `createAdmin.js` script was only run locally.

---

## Solution 1: Create Admin User via Render Console (Recommended)

1. **Go to your Render Dashboard**
   - Navigate to your backend service (`gportfolio-backend`)

2. **Open Shell**
   - Click on "Shell" tab in the left sidebar
   - This opens a terminal connected to your deployed backend

3. **Run the createAdmin script**
   ```bash
   node createAdmin.js
   ```

4. **Verify the output**
   - You should see: "Admin user created successfully!"
   - Or: "Admin user already exists! Updating password..."

5. **Test login**
   - Go to your deployed frontend
   - Try logging in with:
     - Username: `gagugagana01@gmail.com`
     - Password: `gagana12345`

---

## Solution 2: Create Admin User via MongoDB Atlas (Alternative)

If Render shell doesn't work, you can create the user directly in MongoDB:

1. **Go to MongoDB Atlas**
   - Login to your MongoDB Atlas account
   - Navigate to your cluster

2. **Open Collections**
   - Click "Browse Collections"
   - Find your database (likely named `portfolio` or similar)
   - Find the `users` collection

3. **Check if admin exists**
   - Look for a document with username: `gagugagana01@gmail.com`
   - If it exists, you may need to update the password hash

4. **Generate password hash locally**
   - Run this script locally to get the hashed password:
   ```bash
   node generateHash.js
   ```
   (See script below)

5. **Update/Insert the user**
   - If user exists: Update the password field with the new hash
   - If user doesn't exist: Insert a new document:
   ```json
   {
     "username": "gagugagana01@gmail.com",
     "password": "<hashed-password-from-script>"
   }
   ```

---

## Solution 3: Add Admin Creation Endpoint (Temporary)

If the above solutions don't work, we can temporarily add an endpoint to create the admin user:

1. **Add this route to your backend** (already implemented below)
2. **Deploy the changes**
3. **Call the endpoint once** using Postman or browser
4. **Remove the endpoint** after admin is created

---

## Verification Steps

After creating the admin user, verify:

1. **Check backend logs on Render**
   - Look for "Login attempt for: gagugagana01@gmail.com"
   - Check if "User not found" or "Password match result: false"

2. **Check frontend network tab**
   - Open browser DevTools → Network tab
   - Try logging in
   - Check the `/auth/login` request
   - Look at the response status and body

3. **Common error responses:**
   - `401 Invalid username or password` → User doesn't exist or wrong password
   - `500 Internal Server Error` → Backend/database issue
   - `Network Error` → CORS or connectivity issue

---

## Additional Checks

### Check Environment Variables on Render

Ensure these are set:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Any secure random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `PORT` - 5000

### Check Frontend Environment Variable on Netlify

Ensure this is set:
- `VITE_API_URL` - Your Render backend URL (e.g., `https://gportfolio-backend.onrender.com`)

### Check CORS Configuration

In your `backend/server.js`, ensure CORS allows your Netlify domain:
```javascript
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-netlify-url.netlify.app',
  credentials: true
}));
```

---

## Quick Fix Scripts

### generateHash.js (Create this file locally)

```javascript
const bcrypt = require('bcryptjs');

const generateHash = async () => {
  const password = 'gagana12345';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy this hash to MongoDB Atlas');
};

generateHash();
```

Run with: `node generateHash.js`

---

## Still Not Working?

If none of the above work, check:

1. **MongoDB Atlas Network Access**
   - Ensure `0.0.0.0/0` is whitelisted (allows all IPs)
   - Or add Render's IP addresses

2. **Backend Logs**
   - Check Render logs for any errors during login attempt

3. **Database Connection**
   - Verify `MONGO_URI` is correct and database is accessible

4. **Contact me with:**
   - Screenshot of Render logs during login attempt
   - Screenshot of Network tab showing the failed request
   - Any error messages from browser console
