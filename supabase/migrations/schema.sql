-- ReyhanSmartHealth Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =============================================
-- HEALTH RECORDS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.health_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  heart_rate NUMERIC NOT NULL CHECK (heart_rate >= 30 AND heart_rate <= 250),
  sleep_duration NUMERIC NOT NULL CHECK (sleep_duration >= 0 AND sleep_duration <= 24),
  water_intake INTEGER NOT NULL CHECK (water_intake >= 0 AND water_intake <= 50),
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  activity_level INTEGER NOT NULL CHECK (activity_level >= 0 AND activity_level <= 1440),
  mood TEXT CHECK (mood IN ('happy', 'neutral', 'sad', 'anxious', 'energetic', 'tired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

-- Health Records Policies
CREATE POLICY "Users can view own health records"
  ON public.health_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health records"
  ON public.health_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health records"
  ON public.health_records FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health records"
  ON public.health_records FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS health_records_user_id_created_at_idx
  ON public.health_records(user_id, created_at DESC);

-- =============================================
-- AI INSIGHTS TABLE (Optional - for caching)
-- =============================================
CREATE TABLE IF NOT EXISTS public.ai_insights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('pattern', 'risk', 'recommendation', 'warning')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- AI Insights Policies
CREATE POLICY "Users can view own AI insights"
  ON public.ai_insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI insights"
  ON public.ai_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- CHAT MESSAGES TABLE (Optional - for chatbot history)
-- =============================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('user', 'bot')),
  message_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat Messages Policies
CREATE POLICY "Users can view own chat messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for health_records table
CREATE TRIGGER update_health_records_updated_at
  BEFORE UPDATE ON public.health_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- GRANT PERMISSIONS
-- =============================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =============================================
-- SAMPLE QUERY (For Testing)
-- =============================================

-- To verify the schema was created successfully, run:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- =============================================
-- NOTES
-- =============================================

/*
1. This schema creates four main tables:
   - profiles: User profile information
   - health_records: Daily health data entries
   - ai_insights: AI-generated insights (optional, for caching)
   - chat_messages: Chatbot conversation history (optional)

2. Row-Level Security (RLS) is enabled on all tables to ensure users can only access their own data.

3. The schema includes CHECK constraints to validate data integrity.

4. Automatic timestamp updates are handled by triggers.

5. After running this script, you can use the Supabase client in your React app to:
   - Authenticate users
   - Store and retrieve health data
   - Cache AI insights (optional)
   - Save chat history (optional)
*/
