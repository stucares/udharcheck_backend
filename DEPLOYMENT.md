# Udhar Backend - Deployment Guide

## 🚀 Deploy to Render (Recommended - Easier)

### Step 1: Push Code to GitHub
```bash
cd "d:\udhar check"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/udhar-app.git
git push -u origin main
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com) and sign up with GitHub

### Step 3: Create PostgreSQL Database
1. Dashboard → **New** → **PostgreSQL**
2. Name: `udhar-db`
3. Database: `udhar_db`
4. User: `udhar_user`
5. Region: Oregon (or closest to you)
6. Plan: **Free**
7. Click **Create Database**
8. Wait for it to be ready, then copy the **Internal Database URL**

### Step 4: Create Web Service
1. Dashboard → **New** → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `udhar-backend`
   - **Region**: Same as database
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 5: Set Environment Variables
In the Web Service settings → Environment:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `<paste Internal Database URL from Step 3>` |
| `JWT_SECRET` | `<generate a random 64-char string>` |
| `FRONTEND_URL` | `http://localhost:3000` (update later with your frontend URL) |
| `PORT` | `10000` |

### Step 6: Deploy
Click **Deploy** - Render will automatically build and deploy.

### Step 7: Verify
- Check deployment logs for errors
- Visit `https://your-app.onrender.com/api/health` - should return `{"status":"ok"}`
- Visit `https://your-app.onrender.com/api-docs` for API documentation

---

## 🚂 Deploy to Railway (Alternative)

### Step 1: Push Code to GitHub
Same as Render Step 1.

### Step 2: Create Railway Account
1. Go to [railway.app](https://railway.app) and sign up with GitHub

### Step 3: Create New Project
1. Dashboard → **New Project** → **Deploy from GitHub repo**
2. Select your repository
3. Select `backend` folder as root (if prompted)

### Step 4: Add PostgreSQL Database
1. In your project, click **+ New** → **Database** → **Add PostgreSQL**
2. Railway automatically creates the database

### Step 5: Set Environment Variables
Click on your web service → **Variables** tab:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (Railway auto-links this) |
| `JWT_SECRET` | `<generate a random 64-char string>` |
| `FRONTEND_URL` | `http://localhost:3000` |

### Step 6: Deploy
Railway auto-deploys on push. Check the deployment logs.

### Step 7: Get Your URL
- Go to **Settings** → **Domains** → **Generate Domain**
- Your API will be at `https://your-app.up.railway.app`

---

## 🔧 Post-Deployment Steps

### 1. Update Frontend API URL
In your frontend, create/update `.env`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### 2. Update CORS (Backend)
Update `FRONTEND_URL` environment variable to your deployed frontend URL.

### 3. Test Default Admin Login
- Email: `admin@udhar.com`
- Password: `admin123`
- **⚠️ CHANGE THIS IMMEDIATELY after first login!**

### 4. Run Database Migrations (if needed)
**Render**: Go to your Web Service → Shell → Run:
```bash
npx sequelize-cli db:migrate
```

**Railway**: Use Railway CLI:
```bash
railway run npx sequelize-cli db:migrate
```

---

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Server port (auto-set by platform) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for JWT tokens (min 32 chars) |
| `FRONTEND_URL` | Yes | Your frontend URL for CORS |
| `DATABASE_SSL` | No | Set to `false` to disable SSL (default: enabled) |

---

## ⚠️ Free Tier Limitations

### Render Free Tier:
- Web service sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month free
- PostgreSQL free for 90 days, then requires paid plan

### Railway Free Tier:
- $5 credit/month (usually enough for small apps)
- No sleep on free tier
- Better cold start times
- Usage-based billing after credits

### Both Platforms:
- **Ephemeral Storage**: Files in `/uploads` will be lost on redeploy
- For persistent file storage, use: Cloudinary, AWS S3, Supabase Storage

---

## 🔒 Security Checklist

- [ ] Change default admin password after deployment
- [ ] Use a strong JWT_SECRET (64+ random characters)
- [ ] Set correct FRONTEND_URL for CORS
- [ ] Enable HTTPS only (both platforms do this by default)
- [ ] Don't commit `.env` files to GitHub

---

## 🐛 Troubleshooting

### Database Connection Failed
- Verify DATABASE_URL is correct
- Check if database is running
- Ensure SSL is enabled (default for cloud Postgres)

### CORS Errors
- Update FRONTEND_URL to match your frontend domain exactly
- Include protocol: `https://your-frontend.com`

### Cold Start Issues
- Render free tier sleeps after inactivity
- Consider upgrading or using Railway for better performance

### Build Failures
- Check Node.js version compatibility
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors
