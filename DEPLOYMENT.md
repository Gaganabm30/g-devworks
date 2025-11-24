# Deployment Guide

This guide will help you deploy your portfolio application with the backend on Render and the frontend on Netlify.

---

## Backend Deployment (Render)

### Environment Variables

Add these environment variables in your Render dashboard:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
CLOUDINARY_CLOUD_NAME=dw6jnhryf
CLOUDINARY_API_KEY=669427922973679
CLOUDINARY_API_SECRET=q8ADJoT2_RudmivwXC-NxzlKEPM
PORT=5000
```

> [!IMPORTANT]
> Replace `<your-mongodb-connection-string>` with your MongoDB Atlas connection string.
> Replace `<your-jwt-secret-key>` with a secure random string (e.g., generate one using `openssl rand -base64 32`).

### Deployment Steps

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up/login

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Gaganabm30/Gportfolio`

3. **Configure the Service**
   - **Name**: `gportfolio-backend` (or any name you prefer)
   - **Region**: Choose the closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid if you need more resources)

4. **Add Environment Variables**
   - In the "Environment" section, add all the variables listed above

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the deployment to complete (usually 2-5 minutes)
   - Copy your backend URL (e.g., `https://gportfolio-backend.onrender.com`)

---

## Frontend Deployment (Netlify)

### Environment Variables

Create a `.env.production` file in the `frontend` directory with:

```
VITE_API_URL=<your-render-backend-url>
```

> [!IMPORTANT]
> Replace `<your-render-backend-url>` with the URL from Render (e.g., `https://gportfolio-backend.onrender.com`).

### Deployment Steps

1. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com) and sign up/login

2. **Create a New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your repository: `Gaganabm30/Gportfolio`

3. **Configure Build Settings**
   - **Branch to deploy**: `main`
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Add Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add `VITE_API_URL` with your Render backend URL

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 1-3 minutes)
   - Your site will be live at a Netlify URL (e.g., `https://your-site-name.netlify.app`)

6. **Update Backend CORS** (Important!)
   - Go back to your Render dashboard
   - Add a new environment variable:
     ```
     FRONTEND_URL=<your-netlify-url>
     ```
   - Update `backend/server.js` to use this in CORS configuration (if not already done)

---

## Post-Deployment Checklist

- [ ] Backend is running on Render
- [ ] Frontend is deployed on Netlify
- [ ] Environment variables are set correctly on both platforms
- [ ] MongoDB connection is working
- [ ] Cloudinary uploads are working
- [ ] Admin login is functional
- [ ] All pages load correctly
- [ ] Contact form sends emails

---

## Troubleshooting

### Backend Issues
- **MongoDB Connection Failed**: Check your `MONGO_URI` and ensure your IP is whitelisted in MongoDB Atlas
- **Cloudinary Upload Failed**: Verify your Cloudinary credentials
- **Server Not Starting**: Check Render logs for errors

### Frontend Issues
- **API Calls Failing**: Ensure `VITE_API_URL` is set correctly and CORS is configured
- **Build Failed**: Check Netlify build logs for errors
- **Blank Page**: Check browser console for errors

---

## Custom Domain (Optional)

### Netlify
1. Go to "Domain settings" in Netlify
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

### Render
1. Go to "Settings" → "Custom Domain"
2. Add your domain and configure DNS as instructed

---

## Notes

- Render's free tier may spin down after inactivity. The first request after inactivity may take 30-60 seconds.
- Netlify's free tier includes 100GB bandwidth per month.
- Always use HTTPS URLs for production.
