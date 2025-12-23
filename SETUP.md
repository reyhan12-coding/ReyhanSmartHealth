# 🚀 ReyhanSmartHealth - Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Node.js
If you don't have Node.js installed:
1. Go to https://nodejs.org
2. Download the LTS version
3. Install and verify: `node --version`

### Step 2: Install Dependencies
```bash
cd C:\Users\Administrator\.gemini\antigravity\scratch\reyhansmartHealth
npm install
```

This will install all required packages (~2-3 minutes).

### Step 3: Setup Supabase

#### A. Create Free Account
1. Visit https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub, Google, or email

#### B. Create New Project
1. Click "New Project"
2. Fill in:
   - **Name:** reyhansmartHealth
   - **Database Password:** (choose strong password)
   - **Region:** Southeast Asia (Singapore) or closest to you
3. Click "Create new project"
4. Wait ~2 minutes for setup

#### C. Get Your Credentials
1. Go to your project dashboard
2. Click "Settings" (gear icon) → "API"
3. Copy these two values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (long string)

#### D. Run Database Migration
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "+ New query"
3. Open the file: `C:\Users\Administrator\.gemini\antigravity\scratch\reyhansmartHealth\supabase\migrations\schema.sql`
4. Copy ALL the content
5. Paste into Supabase SQL Editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

#### E. Verify Tables Created
1. Click "Table Editor" (left sidebar)
2. You should see these tables:
   - profiles
   - health_records
   - ai_insights
   - chat_messages

### Step 4: Configure Environment Variables

1. Open: `C:\Users\Administrator\.gemini\antigravity\scratch\reyhansmartHealth`
2. Copy `.env.example` to `.env`
3. Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-very-long-anon-key-here
```

**Important:** Replace `YOUR-PROJECT` and the key with actual values from Step 3C.

### Step 5: Start the App
```bash
npm run dev
```

The app will open at: http://localhost:3000

---

## 🎯 First Time Usage

### 1. Register New Account
- Click "Daftar" (Register)
- Enter your name, email, and password
- Click "Daftar" button
- You'll be auto-logged in

### 2. Add Your First Health Data
- You'll see an empty state
- Click "Mulai Sekarang" (Get Started)
- Fill in the health data form:
  - Heart rate (e.g., 72)
  - Sleep duration (e.g., 7.5)
  - Water intake (e.g., 8)
  - Stress level (use slider)
  - Activity level (e.g., 30)
  - Mood (click emoji)
- Click "Simpan" (Save)

### 3. View Your Dashboard
- You'll be redirected to dashboard
- See your health stats
- View AI insights and recommendations
- Explore charts

### 4. Try Other Features
- **AI Insights:** Click "Wawasan AI" in sidebar
- **Chatbot:** Click "Chatbot Kesehatan" and ask questions
- **Profile:** Click "Profil" to edit your name
- **Dark Mode:** Toggle at bottom of sidebar

---

## 🔧 Troubleshooting

### Problem: npm install fails
**Solution:** 
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

### Problem: Supabase connection error
**Solution:**
1. Check `.env` file exists and has correct values
2. Verify Supabase project is running (green status in dashboard)
3. Test credentials in Supabase dashboard → API docs

### Problem: Tables not created
**Solution:**
1. Go back to SQL Editor
2. Check for error messages in red
3. Make sure you copied the ENTIRE schema.sql file
4. Try running the migration again

### Problem: Can't register/login
**Solution:**
1. Check Supabase dashboard → Authentication → Policies
2. Make sure Email provider is enabled (Authentication → Providers)
3. Check browser console for error messages (F12 → Console)

### Problem: Dark mode not working
**Solution:**
- Clear browser cache and refresh
- Check if localStorage is enabled in browser

---

## 📝 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name
```

---

## 🌐 Deployment (Optional)

### Deploy to Vercel (Free)

1. Push code to GitHub (create repo)
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

Your app will be live at: `your-app.vercel.app`

### Deploy to Netlify (Free)

1. Push code to GitHub
2. Go to https://netlify.com
3. "New site from Git" → Choose your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Click "Deploy"

---

## ✅ Testing Checklist

After setup, test these features:

- [ ] Register new user
- [ ] Login with created account
- [ ] See empty state on dashboard
- [ ] Add health data successfully
- [ ] Dashboard shows charts and stats
- [ ] AI insights are generated
- [ ] Chatbot responds to questions
- [ ] Dark mode toggle works
- [ ] Profile can be edited
- [ ] Logout works
- [ ] Login again with same credentials

---

## 📚 Need Help?

### Documentation
- Full README: `README.md`
- Walkthrough: See artifacts folder
- Database Schema: `supabase/migrations/schema.sql`

### Common Issues
- Check browser console (F12) for errors
- Verify Supabase dashboard shows green status
- Make sure `.env` file is in root directory
- Restart dev server after changing `.env`

### Code Structure
- All components in `src/components/`
- AI logic in `src/utils/AIInsightEngine.js`
- Indonesian labels in `src/utils/constants.js`
- Styles in `src/styles/index.css`

---

## 🎉 You're All Set!

Your ReyhanSmartHealth application is ready to use. 

**Key Features:**
- ✅ Track 6 health metrics daily
- ✅ Get AI-powered insights
- ✅ Chat with health AI
- ✅ View beautiful charts
- ✅ Dark/Light mode
- ✅ Fully in Indonesian

**Remember:** This app provides lifestyle insights only. Always consult healthcare professionals for medical advice.

---

**Happy tracking your health! 🏥💚**
