# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `padel-tournament`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" in the settings menu
4. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## 3. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Set Up Database Tables

Run the following SQL in the Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  level VARCHAR(20) CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matches table
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  round VARCHAR(20) CHECK (round IN ('quarterfinals', 'semifinals', 'final')) NOT NULL,
  team1_id UUID REFERENCES users(id),
  team2_id UUID REFERENCES users(id),
  team1_score INTEGER DEFAULT 0,
  team2_score INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tournament_info table
CREATE TABLE tournament_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  max_participants INTEGER NOT NULL,
  current_participants INTEGER DEFAULT 0,
  rules TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial tournament info
INSERT INTO tournament_info (name, date, location, max_participants, current_participants, rules)
VALUES (
  'Copa FEB Padel 2025',
  '2025-11-14 15:00:00+00',
  'School Padel Center, Madrid',
  32,
  0,
  'Aún por definir'
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public read access to matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Allow public read access to tournament_info" ON tournament_info FOR SELECT USING (true);

-- Create policies for user registration
CREATE POLICY "Allow public insert for user registration" ON users FOR INSERT WITH CHECK (true);

-- Create policies for admin access (you'll need to implement authentication)
CREATE POLICY "Allow admin access to all operations" ON users FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Allow admin access to all operations" ON matches FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Allow admin access to all operations" ON tournament_info FOR ALL USING (auth.role() = 'admin');
```

## 5. Test the Connection

1. Start your development server: `npm run dev`
2. Check the browser console for any Supabase connection errors
3. Try registering a new user to test the database connection

## 6. Optional: Set Up Authentication

If you want to add user authentication later:

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your authentication providers
3. Update the database policies to use proper authentication

## Troubleshooting

- **Connection errors**: Check that your environment variables are correct
- **Permission errors**: Ensure RLS policies are set up correctly
- **Type errors**: Make sure your TypeScript types match your database schema

## Next Steps

- Implement user registration functionality
- Add authentication for admin users
- Set up real-time subscriptions for live updates
- Add email notifications for tournament updates

