# Portfolio Deployment Guide

## Prerequisites
- MongoDB Atlas account (or other MongoDB hosting)
- Cloudinary account (already configured)
- Backend hosting account (Render, Railway, or Heroku)
- Frontend hosting account (Netlify or Vercel)

## Step 1: Prepare MongoDB Database

1. **Create MongoDB Atlas Cluster** (if not already done)
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Whitelist all IPs (0.0.0.0/0) for production access

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

3. **Seed Database** (optional)
   ```bash
   cd backend
   node seedData.js
   ```

4. **Create Admin User**
   ```bash
   cd backend
   node create_admin.js
   ```
   - Enter your admin email and password when prompted

## Step 2: Deploy Backend

### Option A: Render (Recommended)

1. **Create New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Service**
   - **Name**: `portfolio-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

3. **Add Environment Variables**
   Go to "Environment" tab and add:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your_generated_secret_key
   CLOUDINARY_CLOUD_NAME=dw6jnhryf
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CORS_ORIGIN=https://your-frontend-domain.netlify.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://portfolio-backend.onrender.com`)

### Option B: Railway

1. **Create New Project**
   - Go to [Railway](https://railway.app/)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure Service**
   - Select the `backend` directory as root
   - Add environment variables (same as Render)
   - Deploy

## Step 3: Deploy Frontend

### Option A: Netlify (Recommended)

1. **Create New Site**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

2. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

3. **Add Environment Variables**
   Go to "Site settings" → "Environment variables":
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at `https://random-name.netlify.app`

5. **Custom Domain** (Optional)
   - Go to "Domain settings"
   - Add your custom domain
   - Update DNS records as instructed

### Option B: Vercel

1. **Import Project**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New" → "Project"
   - Import from GitHub

2. **Configure**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**

## Step 4: Update Backend CORS

After deploying frontend, update backend environment variable:
```
CORS_ORIGIN=https://your-actual-frontend-domain.netlify.app
```

Redeploy backend for changes to take effect.

## Step 5: Verify Deployment

### Test Checklist
- [ ] Visit your deployed frontend URL
- [ ] Check that all images load correctly
- [ ] Navigate to `/admin/login`
- [ ] Login with admin credentials
- [ ] Test uploading a new image in dashboard
- [ ] Verify new content appears on frontend
- [ ] Test all CRUD operations (Create, Read, Update, Delete)

## Troubleshooting

### Images Not Loading
- Check Cloudinary URLs in database
- Verify CORS settings in Cloudinary dashboard
- Check browser console for errors

### Login Not Working
- Verify `VITE_API_URL` is correct
- Check backend logs for errors
- Ensure `JWT_SECRET` is set
- Verify CORS settings allow frontend domain

### Backend Connection Errors
- Check MongoDB connection string
- Verify MongoDB Atlas IP whitelist
- Check backend logs for specific errors

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Review build logs for specific errors

## Maintenance

### Updating Content
1. Login to admin dashboard at `/admin/login`
2. Make changes through the UI
3. Changes are saved directly to MongoDB

### Updating Code
1. Push changes to GitHub
2. Netlify/Vercel will auto-deploy frontend
3. Render/Railway will auto-deploy backend
4. Monitor deployment logs for errors

### Database Backups
- MongoDB Atlas provides automatic backups
- Export data regularly using MongoDB Compass
- Keep local backups of important data

## Security Notes

- Never commit `.env` files
- Use strong passwords for admin accounts
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use HTTPS for all production URLs
- Rotate JWT_SECRET periodically

## Support

If you encounter issues:
1. Check deployment logs
2. Review browser console errors
3. Verify all environment variables
4. Test API endpoints directly
5. Check MongoDB connection
